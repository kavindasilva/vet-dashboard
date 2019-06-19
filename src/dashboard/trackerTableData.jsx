

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

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

class TrackerTableData extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerTableData: null,
    }

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

		this.props.configData.columns.map( trackerInfo => { //each column of trackerConfig
			let columnID=trackerInfo.id;

			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let userPermission = trackerInfo.permissions.find( user => (
				user.userId = this.props.metaData.userID
			));

			console.log("TrackerTableData permission", userPermission) 
			// result: userId, read, write

			//validate columnConfig is not empty

			/** get tracker's current column's instance data */
			let columnInfo = this.props.instanceData.data.find( column => (
				column.columnId === columnID
			) )
			console.log("TrackerTableData colInfo", columnInfo) 
			// result: columnId, value

			if ( userPermission.read && userPermission.write ) {
				returnArr.push( 
					<td> 
						{ columnInfo.value }
					</td> 
				)
			}
			else if( userPermission.read && !userPermission.write){
				returnArr.push(
					<td>
						{ columnInfo.value } ro
					</td>
				)
			}
			
		} )

		return returnArr;
	}

	showTableData0(){
		let returnArr=[]; 
		//console.log("trackerBodyRowData props:", this.props);
			this.props.instanceData.data.map( columnData => {
				let columnConfig = this.props.configData.columns.find(column => (
					column.id = columnData.columnId
				));

				/*let userVisibleData=(columnData.permissions.find( (userPermission) => 
					userPermission.userId==this.props.metaData.userID,	
				))*/
				console.log("TrackerTableData colData", columnData)

				//validate columnConfig is not empty


				//if ( permission.read || permission.write ) {
					returnArr.push( 
						<td> 
							{ columnData.value }
						</td> 
					)
				//}
				
			} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	console.log('TrackerTableData.jsx-mapStateToProps', state);
	return {
		//...props,
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.id === props.trackerId
		)),
		metaData: state.MetaReducer.metaData,

		instanceData: state.TrackInstaReducer.instanceData.find(record => (
			record.id === props.recordId
		)),
	};
}

//export default TrackerTableData;
export default connect(mapStateToProps)(TrackerTableData);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableData));

