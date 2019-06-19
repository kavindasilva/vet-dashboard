
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { petStore } from "../stores/pets";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Menu from "../common/menu";

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableBody from "../dashboard/trackerBody";
import TrackerTableRow from "../dashboard/trackerBodyRow";
import TrackerTableData from "../dashboard/trackerBodyRowData";

import trackersConfig from "../config-data/trackersConfig";
import trackerInstances from "../config-data/trackerInstance";

class Trackers extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:2,
        trackers: trackersConfig,
    }
	//state = { Meta }

	componentDidMount(){
		console.log("Trackers - mount. props:", this.props); //ok
		//console.log("Trackers - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
				{ this.viewTabs() }
			</React.Fragment>
		)
    }
    
    handleChange = (event, newValue) => {
        //this.tabValue=2;
        this.setState({tabValue: newValue});
    }

	/** 
     * View Tabs layout of trackers
     * Display columns : all
     */
	viewTabs(){
		return(
			<div>
				<AppBar position="static" color="default">
                    <Tabs
                        value={this.state.tabValue}
                        onChange={ this.handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="staticTab" /*onClick={ () => this.handleChange(null,1)}*/ />
                        
                        {
                            this.props.instanceData.map( tracker => (
                                <Tab label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.props.instanceData.map( tracker => (
                        this.state.tabValue === tracker.id && 
                        <React.Fragment>
                            <h3>Tracker Name: { tracker.name } </h3>
                            <p>Tracker ID: {tracker.id} </p>

                            <table border="1">
                                <thead>
                                    <tr>
                                        <TrackerTableHeader trackerId={tracker.id}>
                                        </TrackerTableHeader>
                                    </tr>
                                </thead>
                                    <tbody >
                                        <TrackerTableRow trackerId={tracker.id} trackerRecordId={null}>
                                        </TrackerTableRow>
                                    </tbody>
                            </table>

                            {
                                this.showColumns(tracker)
                            }
                        </React.Fragment>
                    ))
                }

			</div>
		);
    }
    
    /** 
     * Show the columns based on user permissions after calling printColumn()
     * This function is called by viewTabs()
     * */
    showColumns( trackerInfo ){

    }

    /**
     * Print the columns where user is authorized
     */
    printColumn = (columnData, userPermission, trackerId) => {
        //console.log("trackers printCol: colData",columnData, "\npermission:", userPermission);
        console.log("trackers id:", trackerId);
        let column = this.objectMerge(columnData,userPermission);
        console.log("trackers printCol: merged", column);

        trackerInstances.map( tracker => (
            tracker.id
        ));
    }

    /**
     * Merges two arrays, and return new array
     * source: https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
     */
    objectMerge(obj, src) {
	    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
	    return obj;
	}

}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
		instanceData: state.TrackInstaReducer.instanceData,
	};
}

//export default Trackers;
export default connect(mapStateToProps)(Trackers);
//export default connect(mapStateToProps)(withStyles(useStyles)(Trackers));

