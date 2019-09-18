//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker, KeyboardDatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CustomDateRangePicker extends React.Component{
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false,
        hs_source_field: this.props.hs_source_field,

        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
    }

    render(){
        return(
            <React.Fragment>
                <MuiPickersUtilsProvider 
                    utils={DateFnsUtils} 
                    onClick={() =>  this.setState({ isOpen: true}) }
                >
                    <DatePicker
                        autoFocus = { false }
                        variant="inline"
                        format="yyyy/MM/dd"
                        label="Starting date"
                        value={ this.state.startDate }
                        onChange={ this.changeStartDate }
                    />

                    <DatePicker
                        autoFocus = { false }
                        variant="inline"
                        format="yyyy/MM/dd"
                        label="Ending date"
                        value={ this.state.endDate }
                        onChange={ this.changeEndDate }
                    />
                </MuiPickersUtilsProvider>	
            
            </React.Fragment>
  
        )
    }

    dispatchUpdate = () => {
        return;
		rootStore.dispatch({
			type: 'UPDATE_CELL_VALUE',
			payload: {
				ticketId: this.state.ticket_id,
				property: this.state.columnName,
                value: this.state.attributeValue,
                data_source: this.state.hs_source_field + "_properties",
			}
		});
	}

	changeStartDate = (selectedDate) => {
        this.setState({ startDate: format(new Date(selectedDate), 'yyyy-MM-dd') });
    }

    changeEndDate = (selectedDate) => {
		this.setState({ endDate: format(new Date(selectedDate), 'yyyy-MM-dd') });
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
        //console.log("CustomDateRangePicker mount: props:", this.props, "state:", this.state);
    }
}


const mapStateToProps = (state, props) => {
    return {};
}


export default connect(mapStateToProps)(CustomDateRangePicker);


