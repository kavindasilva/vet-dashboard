

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
import TableCell from '@material-ui/core/TableCell';

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

class TrackerHeader extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerHeader: null,
    }

	componentDidMount(){
		//console.log("TrackerHeader - mount. props:", this.props); //ok
		//console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableHeaders()
		)
    }


	showTableHeaders(){
		let returnArr=[ ];
		//return( <tr></tr> );
		//console.log("trackerHeader trackerData:", this.props.trackerConfigData)

		//console.log("matched trackerID:", this.props.trackerConfigData.id)

		this.props.trackerConfigData.columns.forEach( column => { 

			let usersVisibleColumns=(column.permissions.find( (userPermission) => 
				userPermission.userId===this.props.metaData.userId,	
			))
			console.log("trackerHeader userVisible", usersVisibleColumns)

			// if usersVisibleColumns empty
			if( usersVisibleColumns!==undefined && usersVisibleColumns.read ){

				returnArr.push( 
					<TableCell 
						key={ column.id }
					>
						{ column.name }
					</TableCell> 
				)

			}
			
		} )
				

		return returnArr;
	}    

}

const mapStateToProps = (state, props) => {
	//console.log('TrackerHeader.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,

		/** filter only the needed tracker instances */
		instancesData: state.TrackInstaReducer.instanceData.filter( instances => (
			instances.trackerId===props.trackerId
		) ),

		/** filter only the needed tracker's config */
		trackerConfigData: state.TrackConfigReducer.configData.find( trackerConfigs => (
			trackerConfigs.id===props.trackerId
		) ),

	};
}

//export default TrackerHeader;
export default connect(mapStateToProps)(TrackerHeader);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerHeader));

