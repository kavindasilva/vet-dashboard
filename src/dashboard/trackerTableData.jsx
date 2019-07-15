

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";

import TableCell from '@material-ui/core/TableCell';

import { trackerColumnDataTypes } from "../common/constants";

class TrackerTableData extends React.Component{
	state = { 
        ...this.props.metaData, 
	}
	
	/** 
	 * defined by column dataType
	 * 
	 * columnType: dataType
	 * */
	/*columnDataTypes = {
		1: 'text',
		2: 'number',
		3: 'radio',
		4: 'date'
	}/* */
	columnDataTypes = trackerColumnDataTypes;

	componentDidMount(){
		console.log("TrackerTableData - mount. props:", this.props); //ok
		//console.log("TrackerTableData - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableData()
			//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
		)
    }

	showTableData(){
		let returnArr=[]; 

		console.log('this.props.configData', this.props.configData);

		this.props.configData.columns.forEach( column => {
			//each column of trackerConfig

			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let userPermission = column.permissions.find( user => (
				user.userId === this.props.metaData.userId
			));

			if (userPermission) {
				let columnValue = this.props.ticketsData[column.name];

				if (undefined === columnValue && userPermission.read){ // to check undefined values
					returnArr.push(
						<TrackerPopup
							key={ column.name }
							ticketId={ this.props.ticketsData.ticket_id }
							columnName={ column.name }
							value={ "--" }
							trackerId={ this.props.trackerId }
							elementType={ this.columnDataTypes[column.type] }
						>
							--
						</TrackerPopup>
					)
				}
				else if (userPermission.read && userPermission.write) {
					// read & write
					returnArr.push( 
						<TrackerPopup
							key={ column.name }
							ticketId={ this.props.ticketsData.ticket_id }
							columnName={ column.name }
							value={ columnValue }
							trackerId={ this.props.trackerId }
							elementType={ this.columnDataTypes[column.type] }
						>
							{ columnValue }
						</TrackerPopup> 
					)
				}
				else if (userPermission.read) {
					// read only permission
					returnArr.push(
						<TableCell key={column.name}>
							{ columnValue } (r/o)
						</TableCell>
					)
				}
			}			
			
		} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	console.log("trackerTableData", props);
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

export default connect(mapStateToProps)(TrackerTableData);

