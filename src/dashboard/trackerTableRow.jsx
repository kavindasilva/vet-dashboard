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
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TrackerTableData from "../dashboard/trackerTableData";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

class TrackerTableRow extends React.Component{
	state = { 
		...this.props.metaData, 
		
		page: 0,
		rowsPerPage: 5,

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
				<React.Fragment>
					{ 
						this.showTableRows() 
					}
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 100]}
						component="div"
						count={this.props.ticketsData.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						backIconButtonProps={{
						'aria-label': 'previous page',
						}}
						nextIconButtonProps={{
						'aria-label': 'next page',
						}}
						onChangePage={ (e, newPage) => { this.setState({page: newPage}) } }
						onChangeRowsPerPage={ (e) => {
							this.setState({rowsPerPage: e.target.value, page: 0 });
						} }
					/>
				</React.Fragment>
				
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
		
			
		this.props.ticketsData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(record => {
			returnArr.push(
				<Row key={record.ticket_id} >
					<TrackerTableData 
						key={record.ticket_id} 
						ticket_id={ record.ticket_id }
						tracker_id = { record.tracker_id }
					/>
				</Row>
			)
		})
			

		// this.props.ticketsData.map( record => {
		// 	if( 1 ){ // kept to add user permissions row-wise later
		// 		returnArr.push(
		// 			<Row key={record.ticket_id} >
		// 				<TrackerTableData 
		// 					key={record.ticket_id} 
		// 					ticket_id={ record.ticket_id }
		// 					tracker_id = { record.tracker_id }
		// 				/>
		// 			</Row>
		// 		)
		// 	}
			
		// } )

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
			trackerConfigs.tracker_id===props.tracker_id
		) ),

		/** particular tracker ticket related ticket data */
		ticketsData: state.ticketsDataReducer.ticketsData.filter(ticket => (
			ticket.tracker_id === props.tracker_id
		)),

	};
}

export default connect(mapStateToProps)(TrackerTableRow);

