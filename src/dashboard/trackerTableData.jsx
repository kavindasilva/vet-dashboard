//import {APP_MODE} from "../common/constants"

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import { trackerColumnDataTypes, globalStyles, ticketCellSize } from "../common/constants";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

const styles = theme => ({
	readOnlyColumn: {
	  backgroundColor: "#eee",
	  color: "#ddd",
	}
});

class TrackerTableData extends React.Component{
	state = { 
        ...this.props.metaData, 
	}
	
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
					<small>No columns available in the config</small>
					this.props.configData : <br/>
					{
						(this.props.configData)
						? JSON.stringify(this.props.configData)
						: "unDefined"
					}
				</Cell>
			)
		}
    }

	showTableData(){
		let returnArr=[]; 

		console.log('this.props.configData', this.props.configData);

		this.props.configData.columns.forEach( column => {
			//each column of trackerConfig

			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let current_user_type = (this.props.metaData.userInfo)? this.props.metaData.userInfo.user_type_id: 0;
			let userTypeRestriction = column.permissions.find( permission => (
				parseInt(permission.user_type_id) === current_user_type
			));

			let columnValue = this.props.ticketsData[column.name];

			if (userTypeRestriction) {
				if ( !userTypeRestriction.is_read_restricted && !userTypeRestriction.is_write_restricted ) {
					// read & write
					returnArr.push( 
						<TrackerPopup
							key={ column.name }
							ticket_id={ this.props.ticketsData.ticket_id }
							columnName={ column.name }
							hs_source_field={ column.hs_source_field }
							value={ (columnValue)?columnValue:"-td-N/A-" }
							tracker_id={ this.props.tracker_id }
							elementType={ this.columnDataTypes[column.data_type] }
						>
							{ columnValue }
						</TrackerPopup> 
					)
				}
				else if (!userTypeRestriction.is_read_restricted) {
					// read only permission
					returnArr.push(
						<Cell 
							key={column.name} 
							style={{
								backgroundColor:"#ffffff",
								minWidth: ticketCellSize.cellWidth, 
								height: ticketCellSize.cellHeight, 
								
								...globalStyles["cell-borders"]								
							}}
						>
							<span 
								className="read-only-input"	
							>
								{ (columnValue)?columnValue:"-td-N/A-" }
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
						value={ (columnValue)?columnValue:"-td-N/A-" }
						tracker_id={ this.props.tracker_id }
						elementType={ this.columnDataTypes[column.data_type] }
					>
						{ columnValue }
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

