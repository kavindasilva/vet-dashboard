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

    sendTextBox(){
        return(
            <TextField
                autoFocus={ true }
                value={ this.state.attributeValue }
                onChange={ (e)=>{ this.setState({attributeValue: e.target.value}) } }
                onBlur={ ()=>{ this.dispatchUpdate(); this.setState({componentState:"read"}); } }
            />
        )
    }

    sendReadOnly(){
        return(
            <Tooltip title="Edit">
                <Button
                    //style={ { position: "absolute" } }        
                    size="sm"
                    onClick={ ()=> { this.setState({componentState: ""}) } }            
                    variant="warning"
                >
                    <EditIcon fontSize="small" />
                </Button>
            </Tooltip>
        )
    }

    dispatchUpdate = () => {
        if(this.props.ticket_property_id){
            console.log("instantPopup: update if");
            rootStore.dispatch({
                type: 'UPDATE_CELL_VALUE',
                payload: {
                    ticketId: this.state.ticket_id,
                    value: this.state.attributeValue,
                    property: this.state.columnName,
                    data_source: this.state.hs_source_field + "_properties",
                    ticketPropertyId: this.props.ticket_property_id,
                    tracker_column_id: this.props.tracker_column_id
                }
            });
        }
        else{ // new property
            console.log("instantPopup: update else");
            ticketAPIobj.updateTicketPropery(null, {
                value: this.state.attributeValue,
                description: 'from datepicker',
                ticket_id: this.state.ticket_id,
                tracker_column_id: this.props.tracker_column_id
            })
            .then(
                res => {
                    if(res && !res.err && res.data && res.data.ticket_property_id){
                        ticketAPIobj.getTicketsAndProperties()
                        .then(
                            res => {
                                if(res && res.err){
                                    this.setState({
                                        errorGetTrackers: true,
                                        errorMsgGetTrackers: res.errMsg.toString()
                                    });
                                    return;
                                }

                                this.setState({ ticketsData: res.data }, function(){
                                    rootStore.dispatch({
                                        type: 'GET_TICKETS_FROM_DB',
                                        payload: {
                                            data: this.state.ticketsData
                                        }
                                    });
                                });
                            }
                        )
                    }
                }
            )
        }

	}

    makeInputElements= () =>{
        switch (this.props.elementType) {
            case "text":
            case "number":
                return(
                    <TextField
                        label={ this.props.attributeName }
                        value={this.state.attributeValue}
                        onChange={ e => (
                            e.preventDefault(),
                            this.setState({ attributeValue: e.target.value }),
                            //(APP_MODE==="DEBUG")&&
                            console.log('New Value', e.target.value, this.state.attributeValue)
                            ) }

                        type={ this.props.elementType }
                        //type="number"
                    />
                );

            case "select":
                return (
                    <React.Fragment>
                        <br />
                        <Select value={ this.state.attributeValue } 
                            onChange={ e => this.setState({ attributeValue: e.target.value }) }
                            fullWidth={true}
                        >
                            {
                                this.props.data.valueSet.map( item =>
                                        <MenuItem key={ item.value } value={ item.value } >{ item.label }</MenuItem>
                                    )
                            }
                        </Select>
                    </React.Fragment>
                );

            case "radio": //popup
                return (
                    <RadioGroup
                        name="genderSelect"
                        value={ this.state.attributeValue }
                        onChange={ (e)=>{
                            this.setState({ attributeValue: e.target.value});
                            console.log(e)
                            }
                        }
                    >	
                        { this.columnPredefinedValues["completedStatus"].map( val => (
                            <FormControlLabel
                                key={ String(val.name) }
                                value={ String(val.name) }
                                control={<Radio color="primary" />}
                                label={ val.value }
                                labelPlacement="end"
                                />
                            )
                        )}
                        
                    </RadioGroup>
                );

            case "checkBox":
                return(
                    <FormGroup>
                        {this.props.data.valueSet.map( (val, index) => (
                            <div key={index} >
                                <FormControlLabel
                                    control={ 
                                        <Checkbox
                                            key={index}
                                            checked={
                                                this.state.attributeValue.includes( val.name)/**/
                                            }
                                            onChange={ (e)=>{
                                                if(e.target.checked){
                                                        this.setState({
                                                                attributeValue: [...this.state.attributeValue, e.target.value]
                                                        })
                                                }
                                                else{ 
                                                        var index = this.state.attributeValue.indexOf(e.target.value);
                                                        if (index > -1) {
                                                            //prevState.list.filter( itm=> itm != index);
                                                            let newArr = [...this.state.attributeValue]; //
                                                                newArr.splice(index, 1);
                                                                this.setState({
                                                                        attributeValue: newArr
                                                                })
                                                        } 
                                                }
                                            }}

                                            value={val.name}
                                            color="primary"
                                        />
                                    }
                                    style={ { width: "100%" } }
                                    label={ val.value }
                                >
                                </FormControlLabel>

                            </div>
                        )
                        )}
                    </FormGroup>
                );
            
            default:
                console.log("invalid case. elemetType: ", this.props.elementType);
                break;
        }
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


