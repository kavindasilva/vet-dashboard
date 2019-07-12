

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

		console.log('this.props.configData', this.props.configData);

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
				let columnInfo = this.props.ticketsData[trackerInfo.name];

				/** sometimes columnInfo may be undefined when columns are variable */

				//console.log("TrackerTableData colInfo", columnInfo) 
				// result: entryId: 5, name: "RFCompletedDate", value: "2019-01-25"

				if(columnInfo===undefined){ // to check undefined values
					// returnArr.push(
					// 	<TableCell>??</TableCell>
					// )
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
				// else{ // testing non visible
				// 	returnArr.push(
				// 		<TableCell key={trackerInfo.name}>
				// 			{ columnInfo.value } NV
				// 		</TableCell>
				// 	)
				// }
			}			
			
		} )

		return returnArr;
	}

}

const mapStateToProps = (state, props) => {
	//console.log("trackerTableData", props);
	let ticketsData = state.ticketsDataReducer.ticketsData.find(record => (
		record.ticketId === props.recordId
	));
	//console.log("trackerTableData ticketData", ticketsData);



	/** initial data to prevent undefined error */
	let hubspotData={  };

	console.log('TrackerTableData.jsx-mapStateToProps', state);
	console.log('state.TrackConfigReducer.configData', state.TrackConfigReducer.configData, props);

	return {
		//...props,
		metaData: state.MetaReducer.metaData,

		/** particular tracker related config data */
		configData: state.TrackConfigReducer.configData.find(tracker => (
			tracker.tracker_id === props.trackerId
		)),

		/** particular tracker related instance data && hubspot data */
		ticketsData: { ...ticketsData, hubData:{ ...hubspotData} },


		
	};
}

export default connect(mapStateToProps)(TrackerTableData);

