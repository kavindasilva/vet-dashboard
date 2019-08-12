//import {APP_MODE} from "../common/constants"

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TrackerTableData from "../dashboard/trackerTableData";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

class TrackerTableRow extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerTableRow: null,
    }

	componentDidMount(){
		//console.log("TrackerTableRow - mount. props:", this.props); //ok
		//console.log("TrackerTableRow - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		if(this.props.ticketsData && this.props.ticketsData.length > 0)
			return(
				this.showTableRows()
				//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
			)
		else
			return(
				<Row>
					<Cell>
						<small>No records available in this tracker</small>
						this.props.ticketsData: <br/>
						{this.props.ticketsData}
					</Cell>
				</Row>
			);
    }
	//TrackerTableRow
	showTableRows(){
		let returnArr=[];
		this.props.ticketsData.map( record => {
	
			if( 1 ){ // kept to add user permissions row-wise later
				returnArr.push(
					<Row key={record.ticket_id} >
						<TrackerTableData 
							key={record.ticket_id} 
							ticketId={ record.ticket_id }
							trackerId = { record.tracker_id }
						/>
					</Row>
				)
			}
			
		} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	//console.log('TrackerTableRow.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,

		//trackerConfigData: state.TrackConfigReducer.configData,
		/** particular tracker related config data */
		trackerConfigData: state.TrackConfigReducer.configData.find( trackerConfigs => (
			trackerConfigs.trackerId===props.trackerId
		) ),

		/** particular tracker ticket related ticket data */
		ticketsData: state.ticketsDataReducer.ticketsData.filter(ticket => (
			ticket.tracker_id === props.trackerId
		)),

	};
}

export default connect(mapStateToProps)(TrackerTableRow);

