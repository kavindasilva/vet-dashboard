

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

class TrackerHeader extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerHeader: null,
    }

	componentDidMount(){
		console.log("TrackerHeader - mount. props:", this.props); //ok
		//console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableHeaders()
		)
    }

	showTableHeaders(){
		let returnArr=[];
		//return(
			this.props.instanceData.map( array => {
				console.log("trackerHeader array:", array)
				
				if(array.id == this.props.trackerId){
					console.log("matched", array.id)
					array.columns.map( column => {
						returnArr.push( <th>{column.name}</th> )
					} )
				}
				
			} )
		//);

		return returnArr;
	}
	
    showTableHeaders1(){
		return(

			<React.Fragment>
				<th></th>
			</React.Fragment>
		);
    }
    

}

const mapStateToProps = state => {
	console.log('TrackerHeader.jsx-mapStateToProps', state);
	return {
		instanceData: state.TrackInstaReducer.instanceData,
	};
}

//export default TrackerHeader;
export default connect(mapStateToProps)(TrackerHeader);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerHeader));

