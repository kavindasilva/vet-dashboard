//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
//import TrackerConfigCell from "../config/abstractTrackerConfigCell"

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, FormControlLabel, IconButton } from "@material-ui/core";
import { spacing } from '@material-ui/system';

import RwIcon from "../config/rwIcon"
import { userTypeArray } from "../common/constants"

//class TrackersPemissionsConfig extends TrackerConfigCell{    
class TrackersPemissionsConfig extends React.Component{    
    state ={
        trackerId: this.props.tracker_id,
        userTypeId: this.props.user_type_id,
        columnName: this.props.column_name,

        read: false,
        write: true,
    }

    render(){
        //console.log('TrackersPemissionsConfig: Rendering cell content');
        //return(<React.Fragment>x</React.Fragment>);
        // let user = Object.values(this.props.allUsers).find( allUser => {
        //     //console.log('this.props.columnPermissions.userTypeId', allUser, this.props, this.props.columnPermissions);
        //     return allUser.user_id === this.props.columnPermissions.userTypeId;
        //  } );
        return(
            <React.Fragment>
                <span >
                { this.props.columnPermissions.userTypeId } . 
                { 
                    /** show user type */
                    (userTypeArray[this.props.columnPermissions.userTypeId])
                    ? userTypeArray[this.props.columnPermissions.userTypeId]
                    : "user type not found"
                }
                </span>
                    
                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    userTypeId={ this.state.userTypeId }
                    rwType={ "read" }
                    rwValue={ this.props.columnPermissions.read }
                    label={"R"}
                >
                </RwIcon>

                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    userTypeId={ this.state.userTypeId }
                    rwType={ "write" }
                    rwValue={ this.props.columnPermissions.write }
                    label={"W"}
                >
                </RwIcon>

            </React.Fragment>
  
        )
    }

    componentDidMount(){
        //console.log("trackerUserConfig arr: :", this.props.allUsers );
        //console.log("trackerUserConfig mount: props:", this.props, "state:", this.state);
        
        this.setState({ 
            read: this.props.columnPermissions.read,
            write: this.props.columnPermissions.write,
        })
    
    }
}


const mapStateToProps = (state, props) => {
    return {
        columnPermissions: getColumnPermissions(state.TrackConfigReducer.configData),
		
        allUsers: { ...state.UserConfigReducer.userData, 
            ...state.UserConfigReducer.partnerData 
        },
    };

    function getColumnPermissions (stateConfigData) {
        let trackerRes = stateConfigData.find(
                tracker => (
                    tracker.tracker_id === parseInt( props.tracker_id )
                )
            )
        if (!trackerRes) { 
            console.log("TrackersPermissionsConfig tracker not found");
            return {} 
        }

        let columnRes = trackerRes.columns.find(
                column => (
                    column.name === props.column_name
                )
            )
        if (!columnRes) { 
            console.log("TrackersPermissionsConfig column not found");
            return {} 
        }

        let permissions = columnRes.permissions.find(
                user => (
                    user.userTypeId === props.user_type_id
                )
            )
        return !permissions ? {} : permissions
    }
}


export default connect(mapStateToProps)(TrackersPemissionsConfig);


