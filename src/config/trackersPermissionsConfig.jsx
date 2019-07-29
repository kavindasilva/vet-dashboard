
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

import RwIcon from "../config/rwIcon"

import { spacing } from '@material-ui/system';

//class TrackersPemissionsConfig extends TrackerConfigCell{    
class TrackersPemissionsConfig extends React.Component{    
    state ={
        trackerId: this.props.tracker_id,
        userId: this.props.user_id,
        columnName: this.props.column_name,

        read: false,
        write: true,
    }

    render(){
        //console.log('TrackersPemissionsConfig: Rendering cell content');
        //return(<React.Fragment>x</React.Fragment>);
        let user = Object.values(this.props.allUsers).find( allUser => {
            console.log('this.props.columnPermissions.userId', allUser, this.props, this.props.columnPermissions);
            return allUser.user_id === this.props.columnPermissions.userId;
         } );
        return(
            <React.Fragment>
                <span >
                { this.props.columnPermissions.userId } . 
                { 
                    /** match current user with all_user_data */
                    (user)
                    ?user.email.toString()
                    :"none"
                }
                </span>
                    
                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    userId={ this.state.userId }
                    rwType={ "read" }
                    rwValue={ this.props.columnPermissions.read }
                    label={"R"}
                >
                </RwIcon>

                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    userId={ this.state.userId }
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

    function getColumnPermissions (configData) {
        let tracker = configData.find(
                tracker => (
                    tracker.tracker_id === parseInt( props.tracker_id )
                )
            )
        if (!tracker) { 
            console.log("TrackersPermissionsConfig tracker not found");
            return {} 
        }

        let column = tracker.columns.find(
                column => (
                    column.name === props.column_name
                )
            )
        if (!column) { 
            console.log("TrackersPermissionsConfig column not found");
            return {} 
        }

        let permissions = column.permissions.find(
                user => (
                    user.userId === props.user_id
                )
            )
        return !permissions ? {} : permissions
    }
}


export default connect(mapStateToProps)(TrackersPemissionsConfig);


