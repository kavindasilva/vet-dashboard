

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
			if ( userPermission) {
				/** get tracker's current column's instance COLUMN data */
				let columnInfo = this.props.ticketsData.columnData.find( column => (
					column.name === trackerInfo.name
				) )
				/** sometimes columnInfo may be undefined when columns are variabe */

				console.log("TrackerTableData colInfo", columnInfo) 

				if(columnInfo===undefined){
					returnArr.push(
						<TableCell>??</TableCell>
					)
				}
				else if ( columnInfo!==undefined && userPermission.read && userPermission.write ) { // read & write
					returnArr.push( 
						<TrackerPopup
							key={trackerInfo.name}
							ticketTicketId={ this.props.ticketsData.ticketId }
							columnName={ columnInfo.name }
							value={ columnInfo.value }

							trackerId={ this.props.trackerId }

							elementType={ this.columnDataTypes[trackerInfo.type] }
							//data={ { valueSet: this.columnPredefinedValues[6] } }
						>
							{ columnInfo.value }
						</TrackerPopup> 
					)
				}
				else if( columnInfo!==undefined && userPermission.read ){ // read only permission
					returnArr.push(
						<TableCell key={trackerInfo.name}>
							{ columnInfo.value } ro
						</TableCell>
					)
				}
				// else{
				// 	returnArr.push(
				// 		<TableCell key={trackerInfo.name}>
				// 			{ columnInfo.value } NV
				// 		</TableCell>
				// 	)
				// }
			}			
			
		} )

		/** mapping objects as an array */
		// let hubspotData = this.props.ticketsData.hubData;
		// Object.keys(hubspotData).map( (key, index) => {
		// 	//return key;
		// 	returnArr.push(
		// 		<TableCell key={key}>
		// 			{ hubspotData[key].toString() }
		// 		</TableCell> 
		// 	)
		// 	//console.log("XX", hubspotData[key]);
		// } )


		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	//console.log("trackerTableData", props);
	let ticketsData = state.ticketsDataReducer.ticketsData.find(record => (
		record.ticketId === props.recordId
	));
	console.log("trackerTableData ticketData", ticketsData);

	let coll=state.TrackConfigReducer.configData.find(tracker => (
		tracker.trackerId === props.trackerId
	))
	console.log("trackerTableData configData", coll);


	/** initial data to prevent undefined error */
	let hubspotData={  };

	console.log('TrackerTableData.jsx-mapStateToProps', state);

	return {
		//...props,
		metaData: state.MetaReducer.metaData,

		/** particular tracker related config data */
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.trackerId === props.trackerId
		)),

		/** particular tracker related instance data && hubspot data */
		ticketsData: { ...ticketsData, hubData:{ ...hubspotData} },


		
	};
}

//export default TrackerTableData;
export default connect(mapStateToProps)(TrackerTableData);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableData));

