

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";
// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

import TableCell from '@material-ui/core/TableCell';

class TrackerTableData extends React.Component{
	state = { 
        ...this.props.metaData, 
	}
	
	/** 
	 * defined by column dataType
	 * 
	 * columnType: dataType
	 * */
	columnDataTypes = {
		1: 'text',
		2: 'number',
		3: 'radio',
		4: 'date'
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

		this.props.configData.columns.forEach( trackerInfo => { //each column of trackerConfig
			
			/** store user permissions of CURRENT COLUMN of trackerConfig user  */
			let userPermission = trackerInfo.permissions.find( user => (
				user.userId === this.props.metaData.userId
			));

			//console.log("TrackerTableData permission", userPermission) 
			// result: userId, read, write

			//validate columnConfig is not empty
			if (userPermission) {
				/** get tracker's current column's instance COLUMN data */
				let columnInfo = this.props.instanceData.data.find( column => (
					column.columnId === trackerInfo.id
				) )

				//console.log("TrackerTableData colInfo", columnInfo) 
				// result: columnId, value

				if ( userPermission.read && userPermission.write ) {
					// returnArr.push( 
					// 	<td key={trackerInfo.id}> 
					// 		{ columnInfo.value }
					// 	</td> 
					// )
					returnArr.push( 
						<TrackerPopup
							key={trackerInfo.id}
							trackerInstanceId={ this.props.instanceData.id }
							columnId={ columnInfo.columnId }
							value={ columnInfo.value }

							//property={  }

							// map columnDataTypes with json columnType
							elementType={ this.columnDataTypes[trackerInfo.type] }
							//data={ { valueSet: this.columnPredefinedValues[6] } }
						> 
							{ columnInfo.value }
						</TrackerPopup> 
					)
				}
				else if( userPermission.read && !userPermission.write){
					returnArr.push(
						<TableCell key={trackerInfo.id}>
							{ columnInfo.value } ro
						</TableCell>
					)
				}
			}			
			
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

