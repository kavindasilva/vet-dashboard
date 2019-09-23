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
import { Tooltip, IconButton } from '@material-ui/core';
import Button from 'react-bootstrap/Button'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


class TicketDownload extends React.Component{
	state = { 
		...this.props.metaData, 
	}
	
	columnDataTypes = trackerColumnDataTypes;

	componentDidMount(){
		console.log("ticketDownload - mount. props:", this.props); //ok
		//console.log("TicketDownload - mount. props.metaData:", this.props.metaData); 
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
					<Button						
						variant="outline-success"
						block={true}
						size="sm"
						style={ {
							paddingTop: "4px"
							// maxHeight: "20x",
							// maxWidth: "20x",
						} }
					>
						<CSVLink 
							data={ this.prepareDownloadData() }
						>
							<Tooltip title="Download CSV">
								<CloudDownloadIcon fontSize="small" />
							</Tooltip>
						</CSVLink>
					</Button>
				</React.Fragment>

			)
		}
		else
			return(<React.Fragment>loading csv data...</React.Fragment>)
    }

	prepareDownloadData = () => {
		let returnArr = [];
		console.log('ticketDownload props', this.props);

		let columnHeaders = []
		this.props.configData.columns.forEach( column => {
			columnHeaders.push(column.name)
		});
		returnArr.push(columnHeaders);

		this.props.ticketsData.map( ticket => {
			let ticketRow = [];
			this.props.configData.columns.forEach( column => {
				//each column of trackerConfig

				let source_field = "hs";
				if(column.hs_source_field === "db")
					source_field = "db";
				source_field = source_field + "_properties";
				//console.log('ticketDownload source-field', source_field);
	
				/** store user permissions of CURRENT COLUMN of trackerConfig user  */
				let current_user_type = (this.props.metaData.userInfo)? this.props.metaData.userInfo.user_type_id: 0;
				let userTypeRestriction = column.permissions.find( permission => (
					parseInt(permission.user_type_id) === current_user_type
				));
	
				let columnValue = ticket[source_field][column.name];
	
				columnValue = (columnValue)? columnValue : "null";
	
				if(userTypeRestriction && !userTypeRestriction.is_read_restricted) { // read allowed
					ticketRow.push(columnValue)
				}
				else if(userTypeRestriction && userTypeRestriction.is_read_restricted) { // read restricted
					ticketRow.push('forbidden')
				}
				else{ // no restrictions defined
					ticketRow.push(columnValue)
				}				
			} )
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

		ticketsData: state.ticketsDataReducer.ticketsData.filter( ticket => (
			ticket.tracker_id == props.tracker_id
		) ),

	};
}

export default connect(mapStateToProps)(TicketDownload);

