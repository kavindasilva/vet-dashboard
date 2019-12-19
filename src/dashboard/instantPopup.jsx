//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";

import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import Popup from "reactjs-popup";
import CustomDatePicker from "../dashboard/datePicker";

import TableCell from '@material-ui/core/TableCell';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup, IconButton, Tooltip } from "@material-ui/core";

import { trackerPopupDefaultValues } from "../common/constants";
import ProgressBar from "../dashboard/onboardProgress"

import ticketAPI from "../apicalls/ticketAPI"
const ticketAPIobj = new ticketAPI();

class InstantPopup extends React.Component{

    /** 
     * defined by columnId
     * 
     * columnId: { predefined value set }
     * */
    columnPredefinedValues = trackerPopupDefaultValues;

    
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false,
        hs_source_field : this.props.hs_source_field,
        attributeValue: this.props.value,

        componentState: "read",

        //value: this.props.value,

    }

    render(){
        return(
            <React.Fragment>
            {/* {
                this.viewProgressBar()
            } */}
            {
                this.viewCell()
            }
            
            </React.Fragment>
        );
    }

    viewCell(){
        //console.log('instantPopup: Rendering cell content');
        switch(this.state.componentState){
            case "read":
                return this.sendReadOnly();
            case "edit":
                return this.sendTextBox();

            default:
                return this.sendTextBox();
        }
    }

    viewProgressBar = () => (
        <React.Fragment>
            {
                (this.state.columnName==="clinic_name") && 
                <ProgressBar
                    ticket_id={ this.props.ticket_id }
                    hospital_name={ this.state.attributeValue }
                />
            }
        </React.Fragment>
    )

    detectButtonPressed = (e) => {
		// console.log("ticketSearch btn press", e);
		if(e.keyCode === 13){ // enter key
            this.dispatchUpdate(); 
            this.setState({componentState:"read"});
        }
        else if(e.keyCode === 27){
            this.setState({
                attributeValue: this.props.value,
                componentState:"read"
            })
        }
	}

    sendTextBox(){
        return(
            <TextField
                autoFocus={ true }
                value={ this.state.attributeValue }
                onChange={ (e)=>{ this.setState({attributeValue: e.target.value}) } }
                onBlur={ ()=>{ this.dispatchUpdate(); this.setState({componentState:"read"}); } }
                onKeyDown={ this.detectButtonPressed }
            />
        )
    }

    sendReadOnly(){
        return(
            <Tooltip title="Edit">
                <Button
                    //style={ { position: "absolute" } }        
                    size="sm"
                    onClick={ ()=> { this.setState({componentState: "edit"}) } }            
                    variant="warning"
                >
                    <EditIcon fontSize="small" />
                </Button>
            </Tooltip>
        )
    }

    dispatchUpdate = () => {
        this.dispatchUpdateToStore();

        ticketAPIobj.updateTicketPropery( this.props.ticket_property_id, {
            value: this.state.attributeValue,
            ticket_id : this.state.ticket_id,
            tracker_column_id: this.props.tracker_column_id
        })
        .then(
            res => {
                if(res && !res.err && res.data && res.data.ticket_property_id){
                    // if(this.props.ticket_property_id)
                    //     this.dispatchUpdateToStore() // no need here
                    // else{
                        rootStore.dispatch({
                            type: 'ADD_CELL_TICKET_PROPERTY_ID',
                            payload: {
                                ticketId: this.state.ticket_id,
                                value: this.state.attributeValue,
                                property: this.state.columnName,
                                ticketPropertyId: res.data.ticket_property_id,
                                tracker_column_id: this.props.tracker_column_id,
                            }
                        });
                    // }
                }
            }
        )

    }

    dispatchUpdateToStore = () => {
        rootStore.dispatch({
            type: 'UPDATE_CELL_VALUE',
            payload: {
                ticketId: this.state.ticket_id,
                value: this.state.attributeValue,
                property: this.state.columnName,
                tracker_column_id: this.props.tracker_column_id,
            }
        });
    }

    componentDidMount(){
        //console.log("instant popup mount:", this.props);
    }
}


const mapStateToProps = (state, props) => {
    //console.log("instant popup", props);

    let ticket_record = null;
    let prop_record = null;

    ticket_record = state.ticketsDataReducer.ticketsData.find(
        tracker => (tracker.ticket_id === props.ticket_id)
    )
    
    if(ticket_record && ticket_record.properties){
        prop_record = ticket_record.properties.find( 
            property => ( property.column_name === props.columnName )
        );
    }

    return {
        popValue: (prop_record) ?prop_record.value: null
    };
}

export default connect(mapStateToProps)(InstantPopup);


