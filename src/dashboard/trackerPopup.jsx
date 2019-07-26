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

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import { trackerPopupDefaultValues, globalStyles } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

//import Rule from "../dashboard/colouringFunctions"
import  * as Rule from "../dashboard/colouringFunctions"
import Peg from "../parsers/conditionsParser"

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

  	render() {
		//console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
				<Cell 
					align={ isNaN(this.props.ticketProperty.value) ? 'left' : 'right' }
					//style={ { backgroundColor: this.evaluateExpr( this.props.configData.rules)} }
					style={{
						...globalStyles["cell-borders"],
					}}
				>
					{ this.showPop() }
				</Cell>
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

	/** check rules available -> map rules -> if true stop */
	validateExpr = () => {
        //this.setState({attributeValue: val});
		let res=null; // pegJS result: JSON
		let eRes=null; // evaluated pegJS result: any

        try { 
            //res = Peg.parse(this.state.attributeValue);
			res = Peg.parse(this.props.configData.rules[0].conditions); //map
			//res = { type: "function", name:"tes", params:[] }
			
			//Rule.tes();
			eRes = Rule.main( res );

            this.setState({statementError: false});
        } catch (ex) {
            res = ex.message;
            this.setState({statementError: true});
        }

        console.log("TrackerPopup expr res",  res);
        console.log("TrackerPopup expr eRes",  eRes);
    }
	/** evaluates expressions and returns color */
	evaluateExpr = (rules) => {
		return "#eeeeee";
	}

	componentDidMount(){
		console.log("trackerPopup didmount props:", this.props);

		this.validateExpr();
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


