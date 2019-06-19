

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
		//console.log("trackerBodyRowData props:", this.props);
			this.props.instanceData.data.map( columnData => {
				let columnConfig = this.props.configData.columns.find(column => (
					column.id = columnData.columnId
				));

				//validate columnConfig is not empty

				/*let permissions = columnConfig.permissions.find(rule => (
					rule.userId == this.props
				));*/

				//if ( permissions.read || permission.write ) {
					//if( usersVisibleColumns.read === true ){
						returnArr.push( 
							<td> 
								{ columnData.value }
							</td> 
						)
					//}
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
			tracker.id == props.trackerId
		)),
		metaData: state.MetaReducer.metaData,

		instanceData: state.TrackInstaReducer.instanceData.find(record => (
			record.id = props.recordId
		)),
	};
}

//export default TrackerTableData;
export default connect(mapStateToProps)(TrackerTableData);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerTableData));

