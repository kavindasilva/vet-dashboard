

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TrackerTableData from "../dashboard/trackerTableData";

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

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
		return(
			this.showTableRows()
			//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
		)
    }
	//TrackerTableRow
	showTableRows(){
		let returnArr=[];
		this.props.instancesData.map( record => {
	
			if( 1 ){ // kept to add user permissions row-wise later
				returnArr.push(
					<tr key={record.id} >
						<TrackerTableData 
							key={record.id} 
							recordId={ record.id }
							trackerId = { record.trackerId }
						/>
					</tr>
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
			trackerConfigs.id===props.trackerId
		) ),

		/** particular tracker instance related instance data */
		instancesData: state.TrackInstaReducer.instanceData.filter(instance => (
			instance.trackerId === props.trackerId
		)),

		/** particular tracker instance related HUBSPOT data */
		// hubspotData: state.TrackInstaReducer.hubspotTickets.filter(ticket => (
		// 	ticket.trackerId === props.trackerId
		// )),

	};
}

//export default TrackerTableRow;
export default connect(mapStateToProps)(TrackerTableRow);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableRow));

