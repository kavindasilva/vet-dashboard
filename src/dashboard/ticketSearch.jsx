//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import Popup from "reactjs-popup";
import CustomDatePicker from "../dashboard/datePicker";
import InstantPopup from "../dashboard/instantPopup";
//import SmallPop from "../dashboard/smallPop";

import TableCell from '@material-ui/core/TableCell';

import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import { trackerPopupDefaultValues, globalStyles, ticketSearchParams } from "../common/constants";

import DateRangePicker from "../dashboard/dateRangePicker"

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";
import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import { MenuItem, IconButton, InputLabel, Container } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button'

import GridContainer from 'react-bootstrap/Container'
import GridRow from 'react-bootstrap/Row'
import GridCol from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
// import FormGroup from 'react-bootstrap/FormGroup'
// import Form from 'react-bootstrap/FormLabel'
// import Form from 'react-bootstrap/FormControl'

import ticketAPI from "../apicalls/ticketAPI";
import CSVdownloader from "../dashboard/ticketDownload"
const ticketAPIObj = new ticketAPI();

const useStyles = theme => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
	},
	searchicon: {
		'$:hover':{
			backgroundColor: "red"
		}
	}
});

const changeInputType = (e) => {
	console.log("ticketSearch changeInput ", e, e.target)
}
//export default class ticketSearch extends Component {
class ticketSearch extends Component {
	state = {
		//searchOption: 'ticket_id',
		searchOption: 'create_date',
		searchWord: '',

		searchWordArr: { create_date:format(new Date(), 'yyyy-MM-dd')+';'+format(new Date(), 'yyyy-MM-dd'), ticket_id:'', clinic_name:'' }, // to maintain separate search values
		searchInputType: 'date',

		searchParam: '',
	}

  	render() {
		return (
			<React.Fragment>
				<Grid container spacing={0}>
					<Grid item sm={1} md={1} xs={1} lg={1}></Grid>
					
					<Grid item sm={3} md={3} xs={3} lg={3}>
						<Form.Group controlId="formGridSearchType">
							<Form.Label>Search by</Form.Label>
							<Form.Control 
								as="select"
								onChange={ e => {
									this.setState({
										searchOption: e.target.value, 
										searchInputType: e.target.inputtype,
										searchWord: this.state.searchWordArr[e.target.value]
									});
									//console.log("ticketSearch input", e, e.target, e.target.input_type) 
								}}
								value={ this.state.searchOption } 
							>
							{
								ticketSearchParams.map( item =>
									<option 
										key={ item.param } value={ item.param }
										inputtype={ item.inputType }
										//onClick={ ()=>this.setState({searchInputType: 'text'}) }
										// onClick={ changeInputType }
										// data-my-value={123}
									>
									{ 
										item.label
									}
									</option>
								)
							}
							</Form.Control>
						</Form.Group>
					</Grid>

					<Grid item sm={6} md={6} xs={6} lg={6}>
					{
						(this.state.searchOption === "create_date") /** unable to change input type with custom props in Menu item  */
						? <DateRangePicker
							start_date={ this.state.searchWordArr['create_date'].split(';')[0] }
							end_date={ this.state.searchWordArr['create_date'].split(';')[1] }
							changeSearchWord={ this.changeSearchWord }
						/>
						: <Form.Group controlId="formGridKeyword">
							<Form.Label>keyword</Form.Label>
							<Form.Control 
								type="text" 
								placeholder="Enter keyword" 
								fullWidth={ true }
								value={ (this.state.searchOption==="ticket_id") ?this.state.searchWordArr['ticket_id'] :this.state.searchWordArr['clinic_name'] }
								onChange={ (e)=>this.changeSearchWord(
									e.target.value,
									this.state.searchOption,
									this.state.searchOption + ":" + e.target.value
								)}
							/>
						</Form.Group>
					}
					</Grid>
					
					<Grid item sm={2} md={2} xs={2} lg={2} style={ {paddingTop: "10px"}} >
						
						<GridContainer>
							<GridRow style={ { padding: "12px 0px 0px 0px"}} >
								<GridCol sm={4} lg={4} md={4} style={{padding: "2px 2px 2px 2px"}} >
									<Tooltip title="Search">
										<Button
											variant="outline-info"
											block={true}
											style={{}}
											className={"searchicon"}
											size="md"
											onClick={ ()=>this.searchTickets() }
										>
											<SearchIcon  fontSize="small" />
										</Button>
									</Tooltip>
								</GridCol>
								<GridCol sm={4} lg={4} md={4} style={{padding: "2px 2px 2px 2px"}} >
									<Tooltip title="Clear">
										<Button
											variant="outline-warning"
											block={true}
											size="md"
											onClick={ ()=>this.props.getAllTickets() }
										>
											<HighlightOffIcon fontSize="small" />
										</Button>
									</Tooltip>
								</GridCol>

								<GridCol sm={4} lg={4} md={4} style={{padding: "2px 2px 2px 2px"}} >
									<CSVdownloader	
										tracker_id={ this.props.tracker_id }
									/>
								</GridCol>
							</GridRow>
						</GridContainer>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}


	searchTickets = () => { // create_date_start:2019-09-06,create_date_end:2019-10-10 -- ticket_id:55
		//ticketAPIObj.searchTickets( this.state.searchOption+ ':' +this.state.searchWord )
		ticketAPIObj.searchTickets( this.state.searchParam )
		.then(
			res => {
				console.log("ticketSearch res", res);
				if(res && res.data){
					this.setState({ ticketsData: res.data }, function(){
						rootStore.dispatch({
							type: 'GET_TICKETS_FROM_DB',
							payload: {
								data: this.state.ticketsData
							}
						});
					});
				}
			}
		)
	}

	changeSearchWord = (newWord, searchType, queryParam) => {
		//console.log("ticketSearch changeWord", newWord, searchType);
		let newSearchArr = { ...this.state.searchWordArr };
		newSearchArr[searchType] = newWord;
		this.setState({
			searchWord: newWord,
			searchWordArr: newSearchArr,
			searchParam: queryParam
		}
		//,()=>console.log("ticketSearch changeWord2", this.state.searchWord, this.state.searchWordArr)
		);
	}

	componentDidMount(){
		//console.log("ticketSearch didmount props:", this.props);
	}

	// componentWillReceiveProps(newProps){
	// 	console.log("ticketSearch newProps")
    //     if(newProps.ticketProperty && newProps.ticketProperty.value!== this.state.attributeValue2)
    //         this.setState({attributeValue2: newProps.propertyValue})
	// }
	
}


const mapStateToProps = (state, props) => {
	return {}
}


export default connect(mapStateToProps)(withStyles(useStyles)(ticketSearch));


