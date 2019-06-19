

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
		console.log("TrackerTableRow - mount. props:", this.props); //ok
		//console.log("TrackerTableRow - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableRows()
			//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
		)
    }
	TrackerTableRow
	showTableRows(){
		let returnArr=[];
		//return(
			this.props.instanceData.map( record => {

				//console.log("trackerBodyRow rowArray:", rowArray); 
				// result: trackerId, id, data[columns]
				// let trackerIndex = this.props.configData.find( tracker => (
				// 	tracker.id === record.trackerId
				// ) )
				// //trackerIndex = trackerIndex;
				// console.log("trackerBodyRow trackerIndex:", trackerIndex, record.trackerId)

				/*let usersVisibleColumns=(this.props.configData.columns.permissions.find( (userPermission) => 
					userPermission.id==this.props.metaData.userID,	
				));
				console.log("trackerBodyRow userVisible", usersVisibleColumns); /* */
			
				if( 1 ){
					returnArr.push(
						<tr>
							<TrackerTableData 
								key={record.id} 
								recordId={ record.id }
								trackerId = { record.trackerId }
							/>
						</tr>
					)
				}
				
			} )
		//);

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	console.log('TrackerTableRow.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
		configData: state.TrackConfigReducer.configData,
		instanceData: state.TrackInstaReducer.instanceData.filter(record => (
			record.trackerId = props.trackerId
		)),
	};
}

//export default TrackerTableRow;
export default connect(mapStateToProps)(TrackerTableRow);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableRow));

