//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker, KeyboardDatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateRangePicker } from 'material-ui-datetime-range-picker';

//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, FormControl, Input } from "@material-ui/core";

import GridContainer from 'react-bootstrap/Container'
import GridRow from 'react-bootstrap/Row'
import GridCol from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";


class CustomDateRangePicker extends React.Component{
    state ={
        ticket_id: this.props.ticket_id,
        columnName: this.props.columnName,
        isOpen: false,
        hs_source_field: this.props.hs_source_field,

        isStartDateOpen: false,
        isEndDateOpen: false,

        startDate: (this.props.start_date) ?this.props.start_date :format(new Date(), 'yyyy-MM-dd'),
        endDate: (this.props.end_date) ?this.props.end_date :format(new Date(), 'yyyy-MM-dd'),

        searchDate: format(new Date(), 'yyyy-MM-dd') + ";" + format(new Date(), 'yyyy-MM-dd')
    }

    render(){
        return(
            <React.Fragment>
                {/* <MuiPickersUtilsProvider 
                    utils={DateFnsUtils} 
                    onClick={() =>  this.setState({ isOpen: true}) }
                > */}
                    {/* <DateRangePicker
                        autoOk={true}
                        autoOpenField={true}
                        // onChange={onChange}
                        // onDismiss={onDismiss}
                        showCalendarStatus={true}
                        //className="my-date-picker"
                        firstDayOfWeek={0}
                        dayButtonSize="6.25vw"
                        calendarDateWidth="80vw"
                        calendarTimeWidth="40vw"
                        local='en-US'
                        mode='portrait'
                        startLabel='Beginning'
                        endLabel='Ending'
                    /> */}
                    <Grid container spacing={0}>
					    <Grid item sm={6} md={6} xs={6}>
                        {
                            this.showStartDatePicker()
                        }
                        </Grid>
                        <Grid item sm={6} md={6} xs={6}>
                        {
                            this.showEndDatePicker()
                        }
                        </Grid>
                    </Grid>
                {/* </MuiPickersUtilsProvider>	 */}
            
            </React.Fragment>
  
        )
    }


    showStartDatePicker = () => {
        return(
            <React.Fragment>
                <Form.Group  >
                    <InputGroup>
                        <InputGroup.Prepend  >
                            <InputGroup.Text >Start Date</InputGroup.Text>
                        </InputGroup.Prepend>
                    
                        <Form.Control
                            type="text"
                            value={ this.state.startDate }
                            onClick={ ()=>this.setState(
                                    {isStartDateOpen: true}
                                )}
                            //readOnly={ true }
                            onChange={ ()=>console.log() }
                        >
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Dialog
                    open={this.state.isStartDateOpen}
                    onClose={ ()=>this.closeStartDatePicker() }
                >
                    <DialogContent>
                        <MuiPickersUtilsProvider 
                            utils={DateFnsUtils} 
                            //onClick={() =>  this.setState({ isOpen: true}) }
                        >
                            <DatePicker
                                open={this.state.isStartDateOpen}
                                fullWidth={ true }
                                autoFocus = { false }
                                //variant="inline"
                                format="yyyy/MM/dd"
                                value={ this.state.startDate }
                                onChange={ (val) => { this.changeStartDate(val) } }
                                onAccept={ (val) => { this.changeStartDate(val); this.closeStartDatePicker() } }
                                onClose={ ()=>this.closeStartDatePicker() }
                            />
                        </MuiPickersUtilsProvider>	
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            onClick={ (e)=>{
                                e.preventDefault()
                                this.setState({isStartDateOpen: false}) 
                            } }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button 
                            onClick={ (e) => { 
                                e.preventDefault()
                                this.setState({isStartDateOpen: false})
                            } } 
                            variant="text" color="primary"
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        )
    }

    showEndDatePicker = () => {
        return(
            <React.Fragment>
                <Form.Group >
                    <InputGroup>
                        <InputGroup.Prepend  >
                            <InputGroup.Text >End Date</InputGroup.Text>
                        </InputGroup.Prepend>
                    
                        <Form.Control
                            type="text"
                            value={ this.state.endDate }
                            onClick={ ()=>this.setState(
                                    {isEndDateOpen: true}
                                )}
                            //readOnly={ true }
                            onChange={ ()=>console.log() }
                        >
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Dialog
                    open={this.state.isEndDateOpen}
                    onClose={ ()=> this.setState({isEndDateOpen: false}) }
                >
                    <DialogContent>
                        <MuiPickersUtilsProvider 
                            utils={DateFnsUtils} 
                        >
                            <DatePicker
                                open={this.state.isEndDateOpen}
                                fullWidth={ true }
                                autoFocus = { false }
                                //variant="inline"
                                format="yyyy/MM/dd"
                                value={ this.state.endDate }
                                onChange={ (val) => { this.changeEndDate(val) } }
                                onAccept={ (val) => { this.changeEndDate(val); this.setState({isEndDateOpen: false}) } }
                                onClose={ ()=> this.setState({isEndDateOpen: false}) }
                            />
                        </MuiPickersUtilsProvider>	
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            onClick={ (e)=>{
                                e.preventDefault()
                                this.setState({isEndDateOpen: false}) 
                            } }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button 
                            onClick={ (e) => { 
                                e.preventDefault()
                                this.setState({isEndDateOpen: false})
                            } } 
                            variant="text" color="primary"
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        )
    }


	changeStartDate = (selectedDate) => {
        if(new Date(selectedDate) > new Date(this.state.endDate))
            console.log("dateRange picker err")
        else
            this.setState({ startDate: format(new Date(selectedDate), 'yyyy-MM-dd') }, ()=>this.makeReturnString() );
    }

    changeEndDate = (selectedDate) => {
        if(new Date(selectedDate) < new Date(this.state.startDate))
            console.log("dateRange picker err")
        else
		    this.setState({ endDate: format(new Date(selectedDate), 'yyyy-MM-dd') }, ()=>this.makeReturnString() );
    }

    closeStartDatePicker = ()=>{
        this.setState({isStartDateOpen: false})
    }

    /** makes the return string and sets it to parent */
	makeReturnString = () => {
        let queryParam = "create_date_start:" + this.state.startDate + ",create_date_end:" + this.state.endDate;
        let combinedDate = this.state.startDate + ";" + this.state.endDate
        this.props.changeSearchWord(combinedDate, 'create_date', queryParam);
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


