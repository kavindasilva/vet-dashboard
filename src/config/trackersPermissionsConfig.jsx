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
//import { userTypeArray } from "../common/constants"

//class TrackersPemissionsConfig extends TrackerConfigCell{    
class TrackersPemissionsConfig extends React.Component{    
    state ={
        trackerId: this.props.tracker_id,
        user_account_id: this.props.user_account_id,
        columnName: this.props.column_name,

        read: false,
        write: true,
    }

    render(){
        return(
            <React.Fragment>
                <span >
                { this.props.columnPermissions.user_account_id } . 
                { 
                    (this.props.partnerList && this.props.partnerList.length>0 )
                    ?    /** show user type */
                        (   
                            this.props.partnerList.find( partner => (
                                partner.partner_id === this.props.columnPermissions.user_account_id
                            ) )
                        )
                        ? this.props.partnerList.find( partner => (
                            partner.partner_id === this.props.columnPermissions.user_account_id
                        ) ).name
                        : "not found"
                    : "loading.."
                }
                </span>
                    
                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    user_account_id={ this.state.user_account_id }
                    rwType={ "read" }
                    rwValue={ this.props.columnPermissions.is_read_restricted }
                    label={"R"}
                >
                </RwIcon>

                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    user_account_id={ this.state.user_account_id }
                    rwType={ "write" }
                    rwValue={ this.props.columnPermissions.is_write_restricted }
                    label={"W"}
                >
                </RwIcon>

                <RwIcon
                    trackerId={ this.state.trackerId }
                    columnName={ this.state.columnName }

                    user_account_id={ this.state.user_account_id }
                    rwType={ "comment" }
                    rwValue={ this.props.columnPermissions.is_comment_restricted }
                    label={"C"}
                >
                </RwIcon>

            </React.Fragment>
  
        )
    }

    componentDidMount(){
        //console.log("trackerUserConfig arr: :", this.props.allUsers );
        //console.log("trackerUserConfig mount: props:", this.props, "state:", this.state);
        
        this.setState({ 
            read: this.props.columnPermissions.is_read_restricted,
            write: this.props.columnPermissions.is_write_restricted,
            comment: this.props.columnPermissions.is_comment_restricted,
        })
    
    }
}


const mapStateToProps = (state, props) => {
    return {
        columnPermissions: getColumnPermissions(state.TrackConfigReducer.configData),
		
        allUsers: state.UserConfigReducer.userData, 
        partnerList: state.UserConfigReducer.partnerData,
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
                    user.user_account_id === props.user_account_id
                )
            )
        return !permissions ? {} : permissions
    }
}


export default connect(mapStateToProps)(TrackersPemissionsConfig);


