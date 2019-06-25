
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Menu from "../common/menu";

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

const styles = theme => ({
	root: {
	  width: "100%",
	  marginTop: theme.spacing.unit * 3,
	  overflowX: "auto"
	},
	head: {
	  backgroundColor: "#eee",
	  position: "sticky",
	  top: 0
	}
});

class Trackers extends React.Component{
	state = { 
        ...this.props.metaData, 

        tabValue:1,
        //trackers: trackersConfig,
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
                                <Tab key={ tracker.id } label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.props.configData.map( tracker => (
                        this.getUserPermittedColumns(tracker),

                        this.state.tabValue === tracker.id && 
                        <React.Fragment key={ tracker.id } >
                            <h3>Tracker Name: { tracker.name } </h3>
                            <p>Tracker ID: {tracker.id} </p>

                            <Paper style={ {} }>
					            <Table size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TrackerTableHeader trackerId={tracker.id}>
                                            </TrackerTableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TrackerTableRow 
                                            trackerId={tracker.id} 
                                            tracker={ tracker }
                                            trackerRecordId={null}>
                                        </TrackerTableRow>
                                    </TableBody>
                                </Table>
                            </Paper>

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
            //console.log("col:", column),
            usersVisibleColumns=[],

            usersVisibleColumns=(column.permissions.find( (userPermission, i, arr) => 
                userPermission.id===this.props.metaData.userId,
                
            )),
            
            //console.log("showCols userVisibleCols", usersVisibleColumns),
            //this.printColumn(column, usersVisibleColumns, trackerInfo.id)

            userTrackerPermissions.push( usersVisibleColumns )

        ) );
        //console.log("showCols userPermissions", userTrackerPermissions)
        //this.dispatchPermissions()

    }

    /**
     * Merges two arrays, and return new array.
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
        
        /** all the tracker instances related data */
        instanceData: state.TrackInstaReducer.instanceData,
        
        /** all the trackers configuration related data */
		configData: state.TrackConfigReducer.configData,
	};
}

//export default Trackers;
//export default connect(mapStateToProps)(Trackers);
export default connect(mapStateToProps)(withStyles(styles)(Trackers));

