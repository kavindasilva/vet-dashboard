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

import { rootStore } from "../stores/pets";
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";


import { trackerPopupDefaultValues } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

//import Checkbox from "./checkBoxComp";

// function getValueOfColumn(columnName){
// 	let returnVal = props.rowColumnData.find( column => (
// 		column.columnName === columnName
// 	) );
// 	console.log("constants getValueOfColumnns retVal:", returnVal);

// 	return returnVal;
// }

//export default class TrackerPopup extends Component {
class TrackerPopup extends Component {
	state = {
		/** trackerInstaid. need in dispatching */	trackerInstanceId		:this.props.trackerInstanceId,
		/** column id. need in dispatching */	columnName		:this.props.ticketsData.name,
		/** property value */     				attributeValue	:this.props.ticketsData.value,
		/** property name */      				attributeName	:this.props.property,
		/** element input type */ 				elementType		:this.props.elementType,
		/** Detect popup modal open state */	isOpen			:false,
		//** temporary day to keep calendar selected date */ tempDayCal: this.props.value,
		//** data location Hubspot / DB */		dataLocation: 'db', //hubspot data not edited!
		
		
		/** for the styles generated by BG scripts */
		styleScript: {
			//backgroundColor: "orange",
			//backgroundColor: eval( this.props.configData.columns[4].rules[0].bgcolor ),
			// backgroundColor: {
			// 	...this.props.configData.rules[0]
			// }.bgcolor ,
			// backgroundColor: this.evaluateExpr(
			// 	{...this.props.configData.rules[0]}.bgcolor
			// 	) ,
		}

	}

	/** 
	 * defined by columnName
	 * 
	 * columnName: { predefined value set }
	 * */
	/*columnPredefinedValues ={
		1: null,				// clinic name

		4: 0,					// RF sent date
		5: null,				// RF completed date
		6: [ { name:true, value:"OK" }, { name:false, value:"NotCompleted"} ],		// completed status
		7: 24					// total duration
	}*/
	//columnPredefinedValues = trackerPopupDefaultValues;

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
		console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
				<TableCell 
					align={ (isNaN(this.props.ticketsData.value))?'left':'right' } 
					//style={ this.state.styleScript }
					//style={ { backgroundColor: this.evaluateExpr(10)} }
					style={ { backgroundColor: this.evaluateExpr( this.props.configData.rules )} }
				>
					{ this.showPop() }
				</TableCell>
			</React.Fragment>
		)
	}

	showPop(){
		//console.log("generating cell input elements", this.props.ticketsData, this.state);
		if(this.state.elementType ==="date" ){
			//console.log("tracker popup1MatUI:",this.props.ticketsData.value);
			return(
				<React.Fragment>
					{ /*this.props.ticketsData.value /* wrong output. old value */ }
					<CustomDatePicker
						trackerInstanceId={ this.props.trackerInstanceId }
						columnName={ this.props.ticketsData.name }
						value={ this.props.ticketsData.value }
						elementType={ this.props.elementType }
					/>
				</React.Fragment>
				
			);
		}
		else{
			return(
				<div style={this.styleTD}>
					test{ String(this.props.ticketsData.value) }
					
						<InstantPopup
							trackerInstanceId={ this.props.trackerInstanceId }
							columnName={ this.props.ticketsData.name }
							//value={ this.state.attributeValue }
							value={ this.props.ticketsData.value }
							elementType={ this.props.elementType }
						>
						</InstantPopup>
					
				</div>
			);
		}
		
	}


	/** evaluates expressions and returns color */
	evaluateExpr=( rulesArr )=>{
		//return "red"; //ok
		console.log("trackerPopup expr:", rulesArr);
		// [ { precedence, bgcolor, conditions } ]
		// sort array by precedence descending
		rulesArr=rulesArr.sort((a, b) => a.precedence > b.precedence);//.reverse();

		//console.log("trackerPopup rowCol value:", getValueOfColumn(1) )
		//console.log("trackerPopup rowCol value:", getValueOfColumn(this.props.rowColumnData,1) )
		
		/** check if-else like */
		rulesArr.forEach( condition => {
			//let stmt = moment().endOf('day').fromNow();
			//let stmt = "var moment="+moment+"; alert( moment().endOf('day').fromNow() )";
			//stmt = (condition.conditions); //.toString();
			//let evalResult=eval(condition.conditions);
			//let evalResult=eval( String(condition.conditions) );

			//console.log("rules conditions", stmt  );
			//console.log("rules conditions", eval(stmt)  );
			//console.log("rules conditions", condition.conditions  );
			//console.log("rules conditions", eval( condition.conditions )  );
			//console.log("rules conditions", eval( "moment().endOf('day').fromNow();" ) ); //
			//console.log("rules conditions", eval("moment().isAfter(moment('2019-02-05').add('1 days'))") ); // true
			//console.log("rules conditions EoD", moment().endOf('day').fromNow()  ); // true
			//console.log("rules conditions", eval( moment().isAfter(moment('2019-02-05').add('1 days')) ) ); // true

			if(condition.conditions){
				console.log("rules if", condition.bgcolor);
				//break;
			}
			else{
				console.log("rules else", condition.bgcolor);
				// continue;
			}
		});

		// if(rulesArr < 10)
		// 	return "red"
		// else
		// 	return "blue"
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
	let trackerIndex = state.ticketsDataReducer.ticketsData.findIndex( tracker => (
		tracker.ticketId === props.trackerInstanceId
	) );

	/** tracker's config's index */
	let trackerConfigIndex = state.TrackConfigReducer.configData.findIndex(tracker => (
		tracker.trackerId === props.trackerId
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


	let data = state.ticketsDataReducer.ticketsData[trackerIndex].columnData.find( column => (
		column.columnName === props.columnName
	) );
	if( trackerIndex > -1 ){
		let response = {
			configData: trackerConfig,

			metaData: state.MetaReducer.metaData,

			/** tracker instance's particular column's data */
			ticketsData: state.ticketsDataReducer.ticketsData[trackerIndex].columnData.find( column => (
				column.name === props.columnName
			) ),

			/**
			 * particular tracker instance's all column data.
			 * needs when evaluating conditions 
			 * */
			rowColumnData: state.ticketsDataReducer.ticketsData[trackerIndex].columnData,

			//configData: state.TrackConfigReducer.configData,
		};

		//console.log('ticketsData', trackerIndex, props.columnName, data, response);

		return response;

	}
	else
		console.log("trackerPopup indexError")
}

/** NOT connected with store since this component is called only by the TrackerTableData */
//export default TrackerPopup;
export default connect(mapStateToProps)(TrackerPopup);

//export default withStyles(styles)(TrackerPopup);
//export default withStyles()(TrackerPopup);

