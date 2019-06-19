
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

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
//import TrackerTableBody from "../dashboard/trackerBody";
import TrackerTableRow from "../dashboard/trackerTableRow";
//import TrackerTableData from "../dashboard/trackerBodyRowData";

import trackersConfig from "../config-data/trackersConfig";
import trackerInstances from "../config-data/trackerInstance";

class Trackers extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:1,
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
                            this.props.configData.map( tracker => (
                                <Tab label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.props.configData.map( tracker => (
                        this.getUserPermittedColumns(tracker),

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
                                        <TrackerTableRow 
                                            trackerId={tracker.id} 
                                            tracker={ tracker }
                                            trackerRecordId={null}>
                                        </TrackerTableRow>
                                    </tbody>
                            </table>

                        </React.Fragment>
                    ))
                }

			</div>
		);
    }
    
    /** 
     * Gets current user authorized column details
     * */
    getUserPermittedColumns( trackerInfo ){
        let userTrackerPermissions=[];
        let usersVisibleColumns=[];

        trackerInfo.columns.map( column => (
            console.log("col:", column),
            usersVisibleColumns=[],

            usersVisibleColumns=(column.permissions.find( (userPermission, i, arr) => 
                userPermission.id===this.props.metaData.userId,
                
            )),

            //usersVisibleColumns.push( column. )
            /*sersVisibleColumns.trackerid= trackerInfo.id,
            usersVisibleColumns.columnId= column.colId,
            usersVisibleColumns.columnName= column.name,
            usersVisibleColumns.columnType= column.type,*/

            console.log("showCols userVisibleCols", usersVisibleColumns),
            //this.printColumn(column, usersVisibleColumns, trackerInfo.id)

            userTrackerPermissions.push( usersVisibleColumns )

        ) );
        console.log("showCols userPermissions", userTrackerPermissions)
        //this.dispatchPermissions()

    }

    /**
     * Merges two arrays, and return new array
     * source: https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
     */
    objectMerge(obj, src) {
	    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
	    return obj;
    }
    
    dispatchPermissions = () => {
		rootStore.dispatch({
			type: 'SET_USER_PERMISSIONS',
			payload: {
				//isLoggedIn: false,
				//userId: 250
				permissions: {...this.state.serverData, isLoggedIn: true }
			}
		});
	}

}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
		//instanceData: state.TrackInstaReducer.instanceData,
		configData: state.TrackConfigReducer.configData,
	};
}

//export default Trackers;
export default connect(mapStateToProps)(Trackers);
//export default connect(mapStateToProps)(withStyles(useStyles)(Trackers));

