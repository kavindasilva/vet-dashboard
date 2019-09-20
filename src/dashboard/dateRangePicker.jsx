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
import { Grid } from "@material-ui/core";

class CustomDateRangePicker extends React.Component{
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false,
        hs_source_field: this.props.hs_source_field,

        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),

        searchDate: format(new Date(), 'yyyy-MM-dd') + ";" + format(new Date(), 'yyyy-MM-dd')
    }

    render(){
        return(
            <React.Fragment>
                <MuiPickersUtilsProvider 
                    utils={DateFnsUtils} 
                    onClick={() =>  this.setState({ isOpen: true}) }
                >
                    <Grid container spacing={1}>
					    <Grid item sm={6} md={6} xs={6}>
                            <DatePicker
                                fullWidth={ true }
                                autoFocus = { false }
                                variant="inline"
                                format="yyyy/MM/dd"
                                label="Starting date"
                                value={ this.state.startDate }
                                onChange={ (val) => { this.changeStartDate(val) } }
                            />
                        </Grid>
                        <Grid item sm={6} md={6} xs={6}>
                            <DatePicker
                                fullWidth={ true }
                                autoFocus = { false }
                                variant="inline"
                                format="yyyy/MM/dd"
                                label="Ending date"
                                value={ this.state.endDate }
                                onChange={ (val) => { this.changeEndDate(val) } }
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>	
            
            </React.Fragment>
  
        )
    }


	changeStartDate = (selectedDate) => {
        this.setState({ startDate: format(new Date(selectedDate), 'yyyy-MM-dd') }, ()=>this.makeReturnString() );
    }

    changeEndDate = (selectedDate) => {
		this.setState({ endDate: format(new Date(selectedDate), 'yyyy-MM-dd') }, ()=>this.makeReturnString() );
    }

	makeReturnString = () => {
        let combinedDate = this.state.startDate + ";" + this.state.endDate
        this.props.changeSearchWord(combinedDate);
    }
    
    componentDidMount(){
        //console.log("CustomDateRangePicker mount: props:", this.props, "state:", this.state);
        this.makeReturnString();
    }
}


const mapStateToProps = (state, props) => {
    return {};
}


export default connect(mapStateToProps)(CustomDateRangePicker);


