//import {APP_MODE} from "../common/constants"

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { evaluateExpression, validateExpression } from "../common/newValidateRule"
import { trackerColumnDataTypes, globalStyles, ticketCellSize, colouringRuleColors } from "../common/constants";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import ProgressBar from "../dashboard/onboardProgress"

const styles = theme => ({
	readOnlyColumn: {
	  backgroundColor: "#eee",
	  color: "#ddd",
	}
});

class TrackerTableData extends React.Component{
	state = { 
		...this.props.metaData,
		rowColumnValues: [],
	}
	// rowColValue = null;
	columnDataTypes = trackerColumnDataTypes;

	componentDidMount(){
		console.log("TrackerTableData - mount. props:", this.props); //ok
		//console.log("TrackerTableData - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		if(
			this.props.configData
			&& this.props.configData.columns
			&& this.props.configData.columns.length > 0
		){
			return(
				this.showTableData()
			)
		}
		else{
			return(
				<Cell>
					<small>No columns available in this Tracker</small>
					{/* this.props.configData : <br/>
					{
						(this.props.configData)
						? JSON.stringify(this.props.configData)
						: "unDefined"
					} */}
					{
						console.log("trackerTableData configData ", this.props.configData)
					}
				</Cell>
			)
		}
    }

	evaluate_expr = ( ast, rules, currentCellValue) => {
		if(!currentCellValue || currentCellValue==="-empty-"){
			// return "#c7cdff";
			return "#eeeeee";
		}

		// https://medium.com/front-end-weekly/3-things-you-didnt-know-about-the-foreach-loop-in-js-ff02cec465b1
		try{
			let retval = "#ecffc7"; // cream yellow
			let continu = true;
			// get each colouring rule. if one is true, return color. stop executing
			if(rules && rules.length>0){
				rules.forEach( rule => {
					console.log("trackerTableData eval_expr res", rule.conditions, ast );
					console.log("trackerTableData eval_expr res22", evaluateExpression(JSON.parse(rule.conditions), ast ) );
					// console.log("trackerTableData eval_expr res22", evaluateExpression(JSON.parse(rule.conditions), { registration_sent_date: "2015-05-05", ip_port: "2015-05-06" }) );

					if(continu && evaluateExpression(JSON.parse(rule.conditions), ast)){
					// if(evaluateExpression(JSON.parse(rule.conditions), { registration_sent_date: "2015-05-05", ip_port: "2015-05-06" } )){
						continu = false;
						//retval = "#11ee11"; //G
						retval= rule.bgcolor;
					}
					// return '#000011'; //test
				} )
			}
			else{ // no rules defined
				retval = "#eeeeee";
			}
			return retval;
			// return "#bb2222"; //R
		}
		catch(e){
			console.log("trackerTableData eval_expr error", e);
			return "#ffcec7";
		}
	}

	showTableData(){
		let rowColValue = {} ;
		let returnArr=[]; 
		console.log('this.props.configData', this.props.configData, this.props.ticketsData);

		this.props.configData.columns.forEach( column => { //each column of trackerConfig
			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let current_user_account_type = (this.props.metaData.userInfo)? this.props.metaData.userInfo.account_id: 0;
			let userTypeRestriction = column.permissions.find( permission => (
				parseInt(permission.user_account_id) === current_user_account_type
			));

			let prop_record = (this.props.ticketsData && this.props.ticketsData.properties)? 
					this.props.ticketsData.properties.find( 
						property => ( property.column_name === column.name )
					): 
					null;
			let columnValue  = (prop_record)? prop_record.value: "-empty-";


			// add column values to state
			//rowColValue = this.state.rowColumnValues
			rowColValue[ String(column.name) ] = (columnValue) ? columnValue : 0; //console.log("trackerTableData rowCol", rowColValue)
			//this.setState({rowColumnValues: rowColValue});
			let cellBgColor = this.evaluate_expr(rowColValue, column.color_rules, columnValue);

			if (userTypeRestriction) {
				if ( !userTypeRestriction.is_read_restricted && !userTypeRestriction.is_write_restricted ) {
					// read & write
					returnArr.push( 
						<TrackerPopup
							key={ column.name }
							ticket_id={ this.props.ticketsData.ticket_id }
							columnName={ column.name }
							hs_source_field={ column.hs_source_field }
							tracker_id={ this.props.tracker_id }
							elementType={ this.columnDataTypes[column.data_type] }
							// cell_color={ "#ede6ee" }
							cell_color={ cellBgColor }
						>
						</TrackerPopup> 
					)
				}
				else if (!userTypeRestriction.is_read_restricted) {
					// read only permission
					returnArr.push(
						<Cell 
							key={column.name} 
							style={{
								backgroundColor: cellBgColor ,
								minWidth: ticketCellSize.cellWidth, 
								height: ticketCellSize.cellHeight, 
								
								...globalStyles["cell-borders"]								
							}}
						>
							<span 
								className="read-only-input"	
							>
								{ columnValue }
								{
									(column.name==="clinic_name") && 
									<ProgressBar
										ticket_id={ this.props.ticketsData.ticket_id }
										hospital_name={ columnValue }
									/>
								}
							</span>
						</Cell>
					)
				}
			}
			else{ // no restrictions defined
				returnArr.push( 
					<TrackerPopup
						key={ column.name }
						ticket_id={ this.props.ticketsData.ticket_id }
						columnName={ column.name }
						hs_source_field={ column.hs_source_field }
						tracker_id={ this.props.tracker_id }
						elementType={ this.columnDataTypes[column.data_type] }
						// cell_color={ "#eeeee6" }
						cell_color={ cellBgColor }
					>
					</TrackerPopup> 
				)
			}
			
		} )

		return returnArr;
	}

	
}

const mapStateToProps = (state, props) => {
	//console.log("trackerTableData", props);
	let ticketsData = state.ticketsDataReducer.ticketsData.find(record => (
		record.ticket_id === props.ticket_id
	));

	// console.log("trackerTableData ticketData", ticketsData);
	// console.log('TrackerTableData.jsx-mapStateToProps', state);

	return {
		//...props,
		metaData: state.MetaReducer.metaData,

		/** particular tracker related config data */
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.tracker_id === props.tracker_id
		)),

		/** particular tracker related instance data && hubspot data */
		ticketsData: { ...ticketsData },

	};
}

export default connect(mapStateToProps)(withStyles(styles)(TrackerTableData));

