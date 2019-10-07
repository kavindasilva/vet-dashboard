//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip, IconButton } from "@material-ui/core";

import ticketAPI from "../apicalls/ticketAPI"
const ticketAPIobj = new ticketAPI();

class CustomDatePicker extends React.Component{

    styleMatUI={
		closeButton: {
			cursor:'pointer', 
			float:'right', 
			marginTop: '5px', 
			width: '20px',
			align: 'right'
		},

		titleBarThin:{
			padding: "0 24 0 24"
		},

		titleBarPrimary:{
			color:"white", "backgroundColor":"#3c4fb0"
		}
    }
    
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false, //this.props.show,
        //isOpen: this.props.showElement, 
        hs_source_field: this.props.hs_source_field,
        attributeValue: this.props.value,
    }

    render(){
        //console.log('datePicker: Rendering cell content');
        
        return(
            <React.Fragment>
                <Tooltip title="Edit">
                    <Button
                        //style={ { position: "absolute" } }        
                        size="sm"
                        onClick={ ()=>{this.setState({ isOpen: true }); console.log("datePicker props", this.props)} }
                        variant="warning"
                    >
                        <EditIcon fontSize="small" />
                    </Button>
                </Tooltip>

                {/* popup modal UI */}
                <Dialog
                    open={this.state.isOpen} 
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >

                    <DialogContent>
                        <MuiPickersUtilsProvider 
                            utils={DateFnsUtils} 
                            onClick={() =>  this.setState({ isOpen: true}) }>
                            <DatePicker
                                autoFocus = { false }
                                format="yyyy/MM/dd"
                                label="Pet admitted date"
                                value={ this.state.attributeValue }
                                onChange={ this.changeDatepickerValue }
                                onAccept={ (e) => this.acceptDatepickerValue(e) }
                                open={ this.state.isOpen }
                                onOpen={ () => { this.openDatepicker() } }
                                onClose={ () => { this.closeDatepicker() } }
                                onClick={ this.openDatepicker }
                            />
                        </MuiPickersUtilsProvider>	
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ ()=>{
                                this.setState({ attributeValue: this.props.value });
                                this.closePopUp() 
                            } }
                            style={ this.styleMatUI.closeButton }	
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button onClick={ (e) => { 
                                e.preventDefault()
                                this.acceptDatepickerValue(this.state.attributeValue)
                                this.closePopUp(); 
                            } } 
                            variant="text" color="primary"
                            style={this.styleMatUI.closeButton} >OK
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
  
        )
    }

    dispatchUpdate = () => {
        if(this.props.ticket_property_id){
            console.log("datePicker: update if");
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
            console.log("datePicker: update else");
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

    openDatepicker = () => {
		this.setState({ isOpen: true})
	}
	closeDatepicker = () => {
		this.setState({ isOpen: false})
	}
	changeDatepickerValue = (selectedDate) => {
		this.setState({ attributeValue: format(new Date(selectedDate), 'yyyy-MM-dd') });
	}

	acceptDatepickerValue = ( val ) => {
		this.setState({ attributeValue: format(new Date(val), 'yyyy-MM-dd') }, () => {
            this.dispatchUpdate();
            this.closeDatepicker();
        });
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    
    componentDidMount(){
        //console.log("custom datepicker mount: props:", this.props, "state:", this.state);
    }
}


const mapStateToProps = (state, props) => {
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
        dateValue: (prop_record) ?prop_record.value: null
    };

}


export default connect(mapStateToProps)(CustomDatePicker);


