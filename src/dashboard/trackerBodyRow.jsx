

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

import TrackerTableRowData from "../dashboard/trackerBodyRowData";

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

class TrackerBodyRow extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerBodyRow: null,
    }

	componentDidMount(){
		console.log("TrackerBodyRow - mount. props:", this.props); //ok
		//console.log("TrackerBodyRow - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableRows()
			//<tr> <td>00</td> <td>00</td> <td>00</td> </tr>
		)
    }

	showTableRows(){
		let returnArr=[];
		//return(
			this.props.configData.map( rowArray => {

				//console.log("trackerBodyRow rowArray:", rowArray); 
				// result: trackeId, id, data[columns]
			
				if( this.props.trackerId === rowArray.trackerId ){
					returnArr.push(
						<tr>
							<TrackerTableRowData 
								key={rowArray.id} 
								rowData={ rowArray } 
							/>
						</tr>
					)
				}
				
			} )
		//);

		return returnArr;
	}

}

const mapStateToProps = state => {
	console.log('TrackerBodyRow.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
		configData: state.TrackConfigReducer.configData,
	};
}

//export default TrackerBodyRow;
export default connect(mapStateToProps)(TrackerBodyRow);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerBodyRow));

