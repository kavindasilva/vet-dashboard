

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

class TrackerBody extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerBody: null,
    }

	componentDidMount(){
		console.log("TrackerBody - mount. props:", this.props); //ok
		//console.log("TrackerBody - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			//this.showTableBody()
			<tbody></tbody>
		)
    }

	showTableBody(){
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
    

}

const mapStateToProps = state => {
	console.log('TrackerBody.jsx-mapStateToProps', state);
	return {
		instanceData: state.TrackInstaReducer.instanceData,
	};
}

//export default TrackerBody;
export default connect(mapStateToProps)(TrackerBody);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerBody));

