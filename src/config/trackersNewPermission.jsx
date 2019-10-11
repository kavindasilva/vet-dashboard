//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
//import TrackerConfigCell from "../config/abstractTrackerConfigCell"

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Form from "react-bootstrap/Form"
import DialogTitle from '@material-ui/core/DialogTitle';

import GridCol from "react-bootstrap/Col"
import GridRow from "react-bootstrap/Row"

import RwIcon from "../config/rwIcon"
import { userTypeArray } from "../common/constants"

class TrackerNewPermission extends React.Component{    
    state ={
        isOpen: false,
        trackersHash: null,

        trackerId: this.props.tracker_id,
        selected_user_type_id: 0,
        columnName: this.props.columnName,

    }

    render(){
        return(
            <React.Fragment>
                <Button
                    onClick={ ()=>this.setState({isOpen: true}) }
                >
                    add
                </Button>

                <Dialog
                    open={this.state.isOpen} 
                    onClose={ ()=>this.setState({ isOpen: false }) }
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        <Form.Row>
                            <Form.Group >                         
                                <Form.Control 
                                    as="select"
                                    onChange={ (e) => {
                                        this.setState({selected_user_type_id: e.target.value})
                                    } }
                                    value={ this.state.selected_user_type_id }
                                >
                                {
                                    userTypeArray.map( (user, i) => (
                                        <option 
                                            key={i}
                                            value={i} 
                                        >
                                            {user}
                                        </option>
                                    ) )
                                }
                                </Form.Control>
                            </Form.Group>
                                
                            <Form.Group style={{paddingTop: "6px"}} >
                                <RwIcon
                                    trackerId={ this.props.tracker_id }
                                    columnName={ this.props.column_name }

                                    user_type_id={ this.state.selected_user_type_id }
                                    rwType={ "read" }
                                    rwValue={ this.getRwcValue("is_read_restricted") }
                                    label={"R"}
                                >
                                </RwIcon>
                            </Form.Group>

                            <Form.Group style={{paddingTop: "6px"}} >
                                <RwIcon
                                    trackerId={ this.props.tracker_id }
                                    columnName={ this.props.column_name }

                                    user_type_id={ this.state.selected_user_type_id }
                                    rwType={ "write" }
                                    rwValue={ this.getRwcValue("is_write_restricted") }
                                    label={"W"}
                                >
                                </RwIcon>
                            </Form.Group>

                            <Form.Group style={{paddingTop: "6px"}} >

                                <RwIcon
                                    trackerId={ this.props.tracker_id }
                                    columnName={ this.props.column_name }

                                    user_type_id={ this.state.selected_user_type_id }
                                    rwType={ "comment" }
                                    rwValue={ this.getRwcValue("is_comment_restricted") }
                                    label={"C"}
                                >
                                </RwIcon> 
                            </Form.Group>

                        </Form.Row>
                    </DialogContent>

                    <DialogActions>
                        {/* <Button 
                            onClick={ ()=> this.setState({ isOpen: false }) }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button> */}

                        
                        <Button
                            variant="outline-primary"
                            onClick={ ()=>{
                                //this.saveNewColumn();
                                this.setState({ isOpen: false });
                            } } 
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }

    getRwcValue = ( rwc ) => {
        let user_type_permission = null;
        if(this.props.columnPermissions && this.props.columnPermissions.permissions && this.props.columnPermissions.permissions.length>0){
            user_type_permission = this.props.columnPermissions.permissions.find( permission => (
                permission.user_type_id == parseInt(this.state.selected_user_type_id)
            ) );
            //console.log("trackernewPermission record", this.state.selected_user_type_id, user_type_permission, this.props.columnPermissions)

            if(user_type_permission)
                return user_type_permission[rwc];
            return false;
        }
        else
            return false;
    }

    componentWillReceiveProps( newProps ){
        if( newProps.trackerColsHash !== this.state.trackersHash ){
            this.setState({trackersHash: newProps.trackerColsHash});
        }
    }

    componentDidMount(){
        //console.log("trackerUserConfig arr: :", this.props.allUsers );
        //console.log("trackerNewPermission mount: props:", this.props, "state:", this.state);
        
        // this.setState({ 
        //     read: this.props.columnPermissions.is_read_restricted,
        //     write: this.props.columnPermissions.is_write_restricted,
        //     comment: this.props.columnPermissions.is_comment_restricted,
        // })
    
    }
}


const mapStateToProps = (state, props) => {
    return {
        columnPermissions: getColumnPermissions(state.TrackConfigReducer.configData),
		
        allUsers: { ...state.UserConfigReducer.userData, 
            ...state.UserConfigReducer.partnerData 
        },

        trackerColsHash: JSON.stringify(state.TrackConfigReducer.configData.find( tracker => (
            tracker.tracker_id === props.tracker_id
        ) )),
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

        return columnRes;

        let permissions = columnRes.permissions.find(
                user => (
                    user.selected_user_type_id === props.selected_user_type_id
                )
            )
        return !permissions ? {} : permissions
    }
}


export default connect(mapStateToProps)(TrackerNewPermission);


