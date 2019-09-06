//import {APP_MODE} from "../common/constants"

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";

import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import { trackerColumnDataTypes, globalStyles } from "../common/constants";

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
			let userTypePermission = column.permissions.find( permission => (
				parseInt(permission.user_type_id) === this.props.metaData.userInfo.user_type_id
			));

			if (userTypePermission) {
				let columnValue = this.props.ticketsData[column.name];

				if ( !userTypePermission.is_read_restricted && !userTypePermission.is_write_restricted ) {
					// read & write
					returnArr.push( 
						<TrackerPopup
							key={ column.name }
							ticketId={ this.props.ticketsData.ticket_id }
							columnName={ column.name }
							value={ (columnValue)?columnValue:"-td-N/A-" }
							trackerId={ this.props.trackerId }
							elementType={ this.columnDataTypes[column.data_type] }
						>
							{ columnValue }
						</TrackerPopup> 
					)
				}
				else if (!userTypePermission.is_read_restricted) {
					// read only permission
					returnArr.push(
						<Cell 
							key={column.name} 
							style={{
								//backgroundColor:"#ffffff",
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
			
		} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	//console.log("trackerTableData", props);
	let ticketsData = state.ticketsDataReducer.ticketsData.find(record => (
		record.ticket_id === props.ticketId
	));

	// console.log("trackerTableData ticketData", ticketsData);
	// console.log('TrackerTableData.jsx-mapStateToProps', state);

	return {
		//...props,
		metaData: state.MetaReducer.metaData,

		/** particular tracker related config data */
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.tracker_id === props.trackerId
		)),

		/** particular tracker related instance data && hubspot data */
		ticketsData: { ...ticketsData },


		
	};
}

export default connect(mapStateToProps)(withStyles(styles)(TrackerTableData));

