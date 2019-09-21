//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
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

import { MenuItem, IconButton, InputLabel } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

import ticketAPI from "../apicalls/ticketAPI";
import CSVdownloader from "../dashboard/ticketDownload"
const ticketAPIObj = new ticketAPI();

const changeInputType = (e) => {
	console.log("ticketSearch changeInput ", e, e.target)
}
//export default class ticketSearch extends Component {
class ticketSearch extends Component {
	state = {
		//searchOption: 'ticket_id',
		searchOption: 'create_date',
		searchWord: '',

		searchWordArr: { create_date:'', ticket_id:'', clinic_name:'' },
		searchInputType: 'date',
	}

  	render() {
		return (
			<React.Fragment>
				<Grid container spacing={0}>
					<Grid item sm={2} md={2} xs={2}></Grid>
					
					<Grid item sm={3} md={3} xs={3}>
						<InputLabel size="sm">Search by1</InputLabel>
						<Select 
							inputProps={{
								label: 'Search by2',
								id: 'search-type-label-placeholder',
							}}
							variant="filled"
							style={ {} }
							value={ this.state.searchOption } 
							onChange={ e => {
								this.setState({
									searchOption: e.target.value, 
									searchInputType: e.target.inputtype,
									searchWord: this.state.searchWordArr[e.target.value]
								});
								//console.log("ticketSearch input", e, e.target, e.target.input_type) 
							}}
							fullWidth={false}
						>
							{
								ticketSearchParams.map( item =>
									<MenuItem 
										key={ item.param } value={ item.param }
										inputtype={ item.inputType }
										//onClick={ ()=>this.setState({searchInputType: 'text'}) }
										// onClick={ changeInputType }
										// data-my-value={123}
									>
									{ 
										item.label
									}
									</MenuItem>
								)
							}
						</Select>
					</Grid>

					<Grid item sm={6} md={6} xs={6}>
					{
						(this.state.searchOption === "create_date") /** unable to change input type with custom props in Menu item  */
						? <DateRangePicker
							changeSearchWord={ this.changeSearchWord }
						/>
						:<TextField
							label={ "keyword" }
							fullWidth={ true }
							value={ (this.state.searchOption==="ticket_id") ?this.state.searchWordArr['ticket_id'] :this.state.searchWordArr['clinic_name'] }
							onChange={ (e)=>this.changeSearchWord(e.target.value, this.state.searchOption) }
						/>
					}
					</Grid>
					
					<Grid item sm={1} md={1} xs={1}>
						<Tooltip title="Search">
							<IconButton
								size="small"
								//onClick={ ()=>console.log("ticketSearch params", this.state.searchOption, this.state.searchWord, this.props.tracker_id) }
								onClick={ ()=>this.searchTickets() }
							>
								<SearchIcon  fontSize="small" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Clear">
							<IconButton
								size="small"
								onClick={ ()=>this.props.getAllTickets() }
							>
								<HighlightOffIcon fontSize="small" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Download CSV">
							<CSVdownloader	
								tracker_id={ this.props.tracker_id }
							/>
						</Tooltip>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}


	searchTickets = () => {
		ticketAPIObj.searchTickets( 'param=' +this.state.searchOption+ '&value=' +this.state.searchWord )
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

	changeSearchWord = (newWord, searchType) => {
		console.log("ticketSearch changeWord", newWord, searchType);
		let newSearchArr = { ...this.state.searchWordArr };
		newSearchArr[searchType] = newWord;
		this.setState({
			searchWord: newWord,
			searchWordArr: newSearchArr
		},
		()=>console.log("ticketSearch changeWord2", this.state.searchWord, this.state.searchWordArr)
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


export default connect(mapStateToProps)(ticketSearch);


