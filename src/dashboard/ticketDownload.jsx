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

import { CSVLink } from "react-csv";

class TicketDownload extends React.Component{
	state = { 
		...this.props.metaData, 
		csvFileData: [[1,2,4]],
	}
	
	columnDataTypes = trackerColumnDataTypes;

	componentDidMount(){
		console.log("ticketDownload - mount. props:", this.props); //ok
		//console.log("TicketDownload - mount. props.metaData:", this.props.metaData); 
		
		// if(
		// 	this.props.configData
		// 	&& this.props.configData.columns
		// 	&& this.props.configData.columns.length > 0
		// )
		// console.log("ticketDownload arr", this.prepareDownloadData() );
	}

	render(){
		if(
			this.props.configData
			&& this.props.configData.columns
			&& this.props.configData.columns.length > 0

			&& this.props.ticketsData 
			
		){
			console.log("ticketDownload arr", this.prepareDownloadData() );
			return(
				<React.Fragment>
					<button>x</button>
					<CSVLink 
						//data={ this.state.csvFileData }
						data={ this.prepareDownloadData() }
					>
						Download me
					</CSVLink>
				</React.Fragment>

			)
		}
		else
			return(<div>PROPS</div>)
    }

	prepareDownloadData = () => {
		let returnArr = [];
		console.log('ticketDownload props-configdata', this.props);

		let columnHeaders = []
		this.props.configData.columns.forEach( column => {
			columnHeaders.push(column.name)
		});
		returnArr.push(columnHeaders);

		this.props.configData.columns.forEach( column => {
			//each column of trackerConfig

			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let current_user_type = (this.props.metaData.userInfo)? this.props.metaData.userInfo.user_type_id: 0;
			let userTypeRestriction = column.permissions.find( permission => (
				parseInt(permission.user_type_id) === current_user_type
			));

			let ticketRow = [];
			let columnValue = this.props.ticketsData[column.name];

			if (userTypeRestriction && !userTypeRestriction.is_read_restricted) {
				// read 
				ticketRow.push(columnValue)
			}
			else{ // no restrictions defined
				ticketRow.push(columnValue)
			}
			
			returnArr.push(ticketRow);
		} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	//console.log("trackerTableData", props);
	// console.log('TicketDownload.jsx-mapStateToProps', state);

	return {
		metaData: state.MetaReducer.metaData,

		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.tracker_id == props.tracker_id
		)),

		ticketsData: state.ticketsDataReducer.ticketsData.find( ticket => (
			ticket.tracker_id == props.tracker_id
		) ),

	};
}

export default connect(mapStateToProps)(TicketDownload);

