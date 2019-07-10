

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

import Container from '@material-ui/core/Container';

import TrackerPopup from "../dashboard/trackerPopup";
// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

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
				let columnInfo = this.props.instanceData.columnData.find( column => (
					column.name === trackerInfo.name
				) )

				console.log("TrackerTableData colInfo", columnInfo) 

				if ( userPermission.read && userPermission.write ) { // read & write
					returnArr.push( 
						<TrackerPopup
							key={trackerInfo.name}
							//trackerInstanceId={ this.props.instanceData.id }
							trackerInstanceId={ this.props.instanceData.instanceId }
							columnName={ columnInfo.name }
							value={ columnInfo.value }

							//trackerId={ this.props.instanceData.trackerId }
							trackerId={ this.props.trackerId }
							//property={  }

							// map columnDataTypes with json columnType
							elementType={ this.columnDataTypes[trackerInfo.type] }
							//data={ { valueSet: this.columnPredefinedValues[6] } }
						>
							{ columnInfo.value }
						</TrackerPopup> 
					)
				}
				else if( userPermission.read ){ // read only permission
					returnArr.push(
						<TableCell key={trackerInfo.name}>
							{ columnInfo.value } ro
						</TableCell>
					)
				}
			}			
			
		} )

		/** mapping objects as an array */
		let hubspotData = this.props.instanceData.hubData;
		Object.keys(hubspotData).map( (key, index) => {
			//return key;
			returnArr.push(
				<TableCell key={key}>
					{ hubspotData[key].toString() }
				</TableCell> 
			)
			//console.log("XX", hubspotData[key]);
		} )


		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	let instanceData = state.TrackInstaReducer.instanceData.find(record => (
		//record.instanceId === props.recordId
		record.instanceId === props.recordId
	));

	let hubspotData={ hubData: {clinic_name:"SampleClinic1", con_value:"STATIC" } };
	if(state.TrackInstaReducer.hubspotTickets !== null){
		hubspotData = state.TrackInstaReducer.hubspotTickets.find(record => (
			// record.clinic_name === instanceData.data.find( column => (
			// 	column.columnId===1 //clinic name
			// ) ).value
			record.objectId === parseInt(instanceData.columnData.find( column => (
				//column.name==="ticketId" //ticket id previous
				column.name==="hub_ticket_id" //ticket id
			) ).value)
		));
	}
	console.log('TrackerTableData.jsx-mapStateToProps', state);

	return {
		//...props,
		metaData: state.MetaReducer.metaData,

		/** particular tracker related config data */
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.trackerId === props.trackerId
		)),

		/** particular tracker related instance data && hubspot data */
		instanceData: { ...instanceData, hubData:{ ...hubspotData} },


		
	};
}

//export default TrackerTableData;
export default connect(mapStateToProps)(TrackerTableData);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableData));

