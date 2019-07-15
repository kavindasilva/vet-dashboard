import React, { Component } from "react";

import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
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
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";


import { trackerPopupDefaultValues } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

//export default class TrackerPopup extends Component {
class TrackerPopup extends Component {
	state = {
		/** trackerInstaid. need in dispatching */	ticketId	:this.props.ticketId,
		/** property name */					columnName		:this.props.ticketProperty.property,
		/** property value */     				attributeValue	:this.props.ticketProperty.value,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	isOpen			:false,
		//** temporary day to keep calendar selected date */ tempDayCal: this.props.value,
		//** data location Hubspot / DB */		dataLocation: 'db', //hubspot data not edited!
		
		
		/** for the styles generated by BG scripts */
		styleScript: {}

	}

	/** style for the table's div content */
	styleTD={
		width: "100%" ,
		minHeight: "18px",
		color: "#111111"
	}

	styleMatUI={
		closeButton: {
			cursor:'pointer', 
			float:'right', 
			marginTop: '5px', 
			width: '20px',
			align: 'right'
		},

		titleBarThin:{
			padding: "0 24 0 24"
		},

		titleBarPrimary:{
			color:"white", "backgroundColor":"#3c4fb0"
		}
	}	

  	render() {
		//console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
				<TableCell 
					align={ isNaN(this.props.ticketProperty.value) ? 'left' : 'right' }
					//style={ { backgroundColor: this.evaluateExpr( this.props.configData.rules)} }
				>
					{ this.showPop() }
				</TableCell>
			</React.Fragment>
		)
	}

	showPop(){
		if(this.state.elementType ==="date" ){
			return(
				<React.Fragment>
					{ /*this.props.ticketProperty.value */ }
					<CustomDatePicker
						ticketId={ this.props.ticketId }
						columnName={ this.props.ticketProperty.property }
						value={ this.props.ticketProperty.value }
						elementType={ this.props.elementType }
					/>
				</React.Fragment>
				
			);
		}
		else{
			return(
				<div style={this.styleTD}>
					{/* test{ String(this.props.ticketProperty.value) } */}
					
						<InstantPopup
							ticketId={ this.props.ticketId }
							columnName={ this.props.ticketProperty.property }
							value={ this.props.ticketProperty.value }
							elementType={ this.props.elementType }
						>
						</InstantPopup>
					
				</div>
			);
		}
		
	}


	/** evaluates expressions and returns color */
	evaluateExpr = (rules) => {
		return "#eeeeee";
	}

	componentDidMount(){
		//console.log("trackerPopup didmount props:", this.props);
		//console.log("trackerPopup didmount moment:", moment().endOf('day').fromNow() ); // ok  in 8 hours
		//console.log("trackerPopup didmount moment:", Moment.endOf('day').fromNow() );
		//console.log("trackerPopup didmount propspart2:", {...this.props.configData.rules[0]}.bgcolor );
		//console.log("trackerPopup didmount propspart2:", eval({...this.props.configData.rules[0]}.conditions) );
		//console.log("trackerPopup didmount propspart2:", eval( 3+5 ) ); // ok 8
		//console.log("trackerPopup didmount propspart2:", moment().isAfter(moment().valueOfColumn(4)).add('3 days') ); // 

	}

}


const mapStateToProps = (state, props) => {
	//console.log('trackerPopup.jsx-mapStateToProps', state);

	/** tracker's instance's index */
	let trackerIndex = state.ticketsDataReducer.ticketsData.findIndex( ticket => (
		ticket.ticket_id === props.ticketId
	) );

	/** tracker's config's index */
	let trackerConfigIndex = state.TrackConfigReducer.configData.findIndex(tracker => (
		tracker.tracker_id === props.trackerId
	));

	/** tracker's config's column data */
	var trackerConfig = null;
	if(trackerConfigIndex>-1){
		trackerConfig = state.TrackConfigReducer.configData[trackerConfigIndex].columns.find(column => (
			column.name === props.columnName
		));
	}
	else
		console.log("trackerPopup trackerConfigIndex error");


	if( trackerIndex > -1 ){
		return {
			configData: trackerConfig,

			metaData: state.MetaReducer.metaData,

			/** tracker instance's particular column's data */
			ticketProperty: {
				'property'	: props.columnName,
				'value' 	: state.ticketsDataReducer.ticketsData[trackerIndex][props.columnName],
				'ticketId'  : state.ticketsDataReducer.ticketsData['ticket_id'],
			},
		};
	}
	else
		console.log("trackerPopup indexError")
}


export default connect(mapStateToProps)(TrackerPopup);


