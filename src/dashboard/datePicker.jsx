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
    styleTD={
		width: "100%" ,
		minHeight: "18px",
		color: "#111111"
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
                        onClick={ ()=>this.setState({ isOpen: true }) }
                        variant="warning"
                    >
                        <EditIcon fontSize="small" />
                    </Button>
                </Tooltip>

                {/* popup modal UI */}
                <Dialog
                    open={this.state.isOpen} // not ok
                    //open={this.props.show} //ok
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    {/* <AppBar position="relative" ></AppBar> */}
                    <DialogTitle id="draggable-dialog-title" 
                    style={
                        { ...this.styleMatUI.titleBarPrimary,  padding: "18px 24px 16px 24px" }
                    }
                    >

                        Change { this.state.attributeName }

                    </DialogTitle>

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
                                onAccept={ this.acceptDatepickerValue }
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
                                this.dispatchUpdate()
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
		rootStore.dispatch({
			type: 'UPDATE_CELL_VALUE',
			payload: {
				ticketId: this.state.ticket_id,
				property: this.state.columnName,
                value: this.state.attributeValue,
                data_source: this.state.hs_source_field + "_properties",
				ticketPropertyId: this.props.ticket_property_id,
                tracker_column_id: this.props.tracker_column_id
			}
		});
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

	acceptDatepickerValue = () => {
        this.dispatchUpdate();
        this.closeDatepicker();
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


