

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { petStore } from "../stores/pets";

import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

class TrackerBodyRowData extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerBodyRowData: null,
    }

	componentDidMount(){
		console.log("TrackerBodyRowData - mount. props:", this.props); //ok
		//console.log("TrackerBodyRowData - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableData()
			//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
		)
    }

	showTableData(){
		let returnArr=[]; 
		console.log("trackerBodyRowData props:", this.props);
		//return(
			this.props.rowData.data.map( columnData => {
				//returnArr.push( <tr>); //make another component
				console.log("trackerBodyRowData columnData:", columnData);
			
				//if( columnData.trackerId == this.props.trackerId ){
					returnArr.push( 
						<td> 
							{ columnData.value }
						</td> 
					)
				//}
				
			} )
		//);

		return returnArr;
		//return ( <td></td> )
	}

}

const mapStateToProps = state => {
	console.log('TrackerBodyRowData.jsx-mapStateToProps', state);
	return {
		//...props,
		configData: state.TrackConfigReducer.configData,
		metaData: state.MetaReducer.metaData,
	};
}

//export default TrackerBodyRowData;
export default connect(mapStateToProps)(TrackerBodyRowData);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerBodyRowData));

