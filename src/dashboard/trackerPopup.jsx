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

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import { trackerPopupDefaultValues, globalStyles } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import CellHistory from "../dashboard/cellHistory"

//import Rule from "../dashboard/colouringFunctions"
import  * as Rule from "../dashboard/colouringFunctions"
import Peg from "../parsers/conditionsParser"
import cellHistory from "../dashboard/cellHistory";

//export default class TrackerPopup extends Component {
class TrackerPopup extends Component {
	state = {
		/** trackerInstaid. need in dispatching */	ticket_id	:this.props.ticket_id,
		// /** property name */					columnName		:this.props.ticketProperty.property,
		// /** property value */     				attributeValue	:this.props.ticketProperty.value,
		/** element input type */ 				elementType		:this.props.elementType,

		attributeValue2	:this.props.propertyValue,
		hoverTimeOut: null,
		viewHoverButtons: false,
		
		/** for the styles generated by BG scripts */
		styleScript: {}

	}

  	render() {
		//console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
				<Cell
					onMouseEnter={ ()=>this.handleHoverButtons() }
					onMouseLeave={ ()=> {
						//console.log("trackerPopup mouse leave");
						this.setState({viewHoverButtons: false});
						clearTimeout(this.state.hoverTimeOut)
					}}
					//onMouseLeave={ ()=>this.setState({viewHoverButtons: false}) }
					align={ isNaN(this.props.ticketProperty.value) ? 'left' : 'right' }

					//style={ { backgroundColor: this.evaluateExpr( this.props.configData.rules)} }
					style={{
						...globalStyles["cell-borders"],
						minHeight: "30px", minWidth: "70px" 
					}}
				>
					{ this.state.attributeValue2 }
					{ this.showHoverButtons() }
				</Cell>
			</React.Fragment>
		)
	}

	/**
	 * render edit and history buttons
	 */
	showHoverButtons(){
		return(
			<div hidden={ !this.state.viewHoverButtons }>
				{ this.showPop() }
				<CellHistory 
					ticket_property_id = { this.props.ticket_property_id }
				/>
			</div>
		)
	}

	showPop(){
		if(this.state.elementType ==="date" ){
			return(
				<React.Fragment>
					{ /*this.props.ticketProperty.value */ }
					<CustomDatePicker
						ticket_id={ this.props.ticket_id }
						columnName={ this.props.ticketProperty.property }
						value={ this.props.ticketProperty.value }
						elementType={ this.props.elementType }
						hs_source_field={ this.props.hs_source_field }
						ticket_property_id = { this.props.ticket_property_id }
					/>
				</React.Fragment>
				
			);
		}
		else{
			return(
				<div style={ { width: "100%", minHeight: "18px", color: "#111111"} }>
					{/* test{ String(this.props.ticketProperty.value) } */}
					
					<InstantPopup
						ticket_id={ this.props.ticket_id }
						columnName={ this.props.ticketProperty.property }
						value={ this.props.ticketProperty.value }
						elementType={ this.props.elementType }
						hs_source_field={ this.props.hs_source_field }
						ticket_property_id = { this.props.ticket_property_id }
					>
					</InstantPopup>
					
				</div>
			);
		}
		
	}

	/**
	 * check for 2s on hover and show buttons
	 */
	handleHoverButtons = () => {
		this.setState({viewHoverButtons: false});

		if (!this.state.hoverTimeOut) {
			//console.log("handleHoverButtons 1")
			this.setState({ hoverTimeOut: setTimeout( () => {
				this.setState({viewHoverButtons: true});
			}, 1000) })
		}
		else{
			//console.log("handleHoverButtons e");
			this.setState({viewHoverButtons: false});
			this.setState({hoverTimeOut: null});
		}

	}

	/** check rules available -> map rules -> if true stop */
	validateExpr = () => {
        //this.setState({attributeValue: val});
		let res=null; // pegJS result: JSON
		let eRes=null; // evaluated pegJS result: any

        try { 
            //res = Peg.parse(this.state.attributeValue);
			//res = Peg.parse(this.props.configData.rules[0].conditions); //map
			//res = { type: "function", name:"moment", parameters:[] }
			res = { type: "function", name:"moment", parameters:[{ type:"string",value:"2012-06-20"}] }
			//res = { type:"function",name:"moment",parameters:[ { type:"string",value:"20120620"},{type:"string",value:"YYYYMMDD"}]}
			
			//Rule.tes();
			eRes = Rule.main( res );

            this.setState({statementError: false});
        } catch (ex) {
            res = ex.message;
            this.setState({statementError: true});
        }

        //console.log("TrackerPopup expr res",  res);
        //console.log("TrackerPopup expr evaluatedRes",  eRes.toString() );
    }
	/** evaluates expressions and returns color */
	evaluateExpr = (rules) => {
		return "#eeeeee";
	}

	componentDidMount(){
		//console.log("trackerPopup didmount props:", this.props);

		//this.evaluateExpr(null);
		//this.validateExpr();
	}

	componentWillReceiveProps(newProps){
		console.log("trackerPopup newProps")
        if(newProps.ticketProperty && newProps.ticketProperty.value!== this.state.attributeValue2)
            this.setState({attributeValue2: newProps.propertyValue})
	}
	
}


const mapStateToProps = (state, props) => {
	//console.log('trackerPopup.jsx-mapStateToProps', state);
	//console.log('trackerPopup.jsx-props1', props);

	/** ticket's index */
	let ticketIndex = state.ticketsDataReducer.ticketsData.findIndex( ticket => (
		ticket.ticket_id === props.ticket_id
	) );

	/** tracker's config's index */
	let trackerConfigIndex = state.TrackConfigReducer.configData.findIndex(tracker => (
		tracker.tracker_id === props.tracker_id
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


	if( ticketIndex > -1 ){
		let source_field = props.hs_source_field + "_properties";

		let ticketPropId = 0;
		if(
			state.ticketsDataReducer.ticketsData[ticketIndex]
			&& state.ticketsDataReducer.ticketsData[ticketIndex].properties
			&& state.ticketsDataReducer.ticketsData[ticketIndex].properties.length>0
		){
			ticketPropId = state.ticketsDataReducer.ticketsData[ticketIndex].properties.find( p => (
				p.tracker_column_id == String(trackerConfig['tracker_column_id'])
			))

			ticketPropId = (ticketPropId)? ticketPropId.ticket_property_id : null;
		}
		//console.log("trackerPopup mapState", ticketPropId, trackerConfig['tracker_column_id'])

		// update problem occurs in db_properties
		let columnObjValue = null;
		let columnObj = state.ticketsDataReducer.ticketsData[ticketIndex][source_field][props.columnName];
		if(source_field==="db_properties"){
			columnObjValue = state.ticketsDataReducer.ticketsData[ticketIndex][source_field][props.columnName];
			columnObjValue = (columnObjValue)? columnObjValue['value']: null;
		}
		else if(source_field==="hs_properties")
			columnObjValue = state.ticketsDataReducer.ticketsData[ticketIndex][source_field][props.columnName];
		
		
		return {
			configData: trackerConfig,

			metaData: state.MetaReducer.metaData,

			/** tracker instance's particular column's data */
			ticketProperty: {
				'property'	: props.columnName,
				'value' 	: columnObjValue,
				'ticketId'  : state.ticketsDataReducer.ticketsData[ticketIndex]['ticket_id'],
			},

			propertyValue: columnObjValue,

			ticket_property_id: ticketPropId,
		};
	}
	else
		console.log("trackerPopup indexError")
}


export default connect(mapStateToProps)(TrackerPopup);


