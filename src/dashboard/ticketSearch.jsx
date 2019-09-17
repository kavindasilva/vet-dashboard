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

import { trackerPopupDefaultValues, globalStyles } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

import { ticketSearchParams } from "../common/constants"
import { MenuItem } from "@material-ui/core";

import ticketAPI from "../apicalls/ticketAPI";
const ticketAPIObj = new ticketAPI();

//export default class ticketSearch extends Component {
class ticketSearch extends Component {
	state = {
		searchOption: 'ticket_id',
		searchWord: '',
	}

  	render() {
		return (
			<React.Fragment>
				<Select value={ this.state.searchOption } 
					onChange={ e => this.setState({ searchOption: e.target.value }) }
					fullWidth={false}
				>
					{
						ticketSearchParams.map( item =>
								<MenuItem key={ item.param } value={ item.param } >{ item.label }</MenuItem>
							)
					}
				</Select>

				<TextField
					value={ this.state.searchWord }
					onChange={ (e)=>this.setState({searchWord: e.target.value}) }
				/>

				<Button
					//onClick={ ()=>console.log("ticketSearch params", this.state.searchOption, this.state.searchWord, this.props.tracker_id) }
					onClick={ ()=>this.searchTickets() }
				>
					Search
				</Button>
				<Button
					onClick={ ()=>this.props.getAllTickets() }
				>
					Reset
				</Button>
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


