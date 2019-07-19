
import React, { Component } from "react";
import TrackerConfigCell from "../config/abstractTrackerConfigCell"

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

//class TrackersPemissionsConfig extends TrackerConfigCell{    
class TrackersPemissionsConfig extends React.Component{    
    state ={
        trackerId: this.props.tracker_id,
        userId: this.props.user_id,
        columnName: this.props.column_name,

        read: true,
        write: true,
    }

    render(){
        //console.log('TrackersPemissionsConfig: Rendering cell content');
        //return(<React.Fragment>x</React.Fragment>);
        return(
            <React.Fragment>
                <span >
                { this.props.columnPermissions.userId } . 
                { 
                    /** match current user with all_user_data */
                    Object.values(this.props.allUsers).find( allUser => (
                        allUser.user_id === this.props.columnPermissions.userId
                    ) ).email.toString()
                }
                </span>
                    
                <IconButton
                    size="small"
                    style={
                        (this.state.read)?
                            { "color":"green" }
                            :{ "text-decoration": "line-through", "color":"red" }
                    }
                    onClick = { () => { 
                        this.setState({read: !this.state.read}, function(){
                            this.dispatchPermissionsUpdate()
                        });
                    } }
                >
                    R
                </IconButton>

                <IconButton
                    size="small"
                    style={ 
                        (this.state.write)?
                            { "color":"green" }
                            :{ "text-decoration": "line-through", "color":"red" }
                    }
                    onClick = { () => { 
                        this.setState({write: !this.state.write}, function(){
                            this.dispatchPermissionsUpdate()
                        });
                        ;
                    } }
                >
                    W
                </IconButton>
            </React.Fragment>
  
        )
    }

    dispatchPermissionsUpdate = ( ) => {
        //return;
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_USER_PERMISSIONS',
			payload: {
				trackerId: this.state.trackerId,
                columnName: this.state.columnName,
                
                userId: this.state.userId,
				readValue: this.state.read,
				writeValue: this.state.write,
			}
		});
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
	//state.TrackConfigReducer.configData;
	let configValue = state.TrackConfigReducer.configData.find( tracker => (
		tracker.tracker_id === parseInt( props.tracker_id )
	) );
    return {
        columnPermissions: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.column_name
		) )
		.permissions.find( user => (
            user.userId === props.user_id
        ) ),
		
        allUsers: { ...state.UserConfigReducer.userData, 
            ...state.UserConfigReducer.partnerData 
        },
        //allUsers: [ ...state.UserConfigReducer.userData]
    };
}


export default connect(mapStateToProps)(TrackersPemissionsConfig);


