

import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { petStore } from "../stores/pets";

import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// import trackersConfig from "../config-data/trackersConfig";
// import trackerInstances from "../config-data/trackerInstance";

class TrackerHeader extends React.Component{
    // props: trackerId
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        TrackerHeader: null,
    }

	componentDidMount(){
		console.log("TrackerHeader - mount. json:", this.state.TrackerHeader); //ok
		console.log("TrackerHeader - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		return(
			this.showTableHeaders()
		)
    }

    showTableHeaders(){
        <React.Fragment>
            <th></th>
        </React.Fragment>
    }
    

}

const mapStateToProps = state => {
	console.log('TrackerHeader.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
	};
}

//export default TrackerHeader;
export default connect(mapStateToProps)(TrackerHeader);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackerHeader));

