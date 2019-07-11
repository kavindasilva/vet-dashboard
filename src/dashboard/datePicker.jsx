
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/pets";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        trackerInstanceId: this.props.trackerInstanceId,
        columnName: this.props.columnName,
        isOpen: this.props.show,
        attributeValue: this.props.dateValue.value,
        //attributeValue: this.props.value,
    }

    render(){
        console.log('datePicker: Rendering cell content');
        
        return(
            <React.Fragment>
                <div style={this.styleTD}
                    onClick={ ()=>(
                        //this.openPopUp()
                        this.setState({ isOpen: true })
                        //console.log( "Popoup clicked: ",this ); 
                        ) } 
                >
                    { String(this.props.dateValue.value) }
                </div>

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
                                //onlyCalendar
                                //variant="inline"
                                format="yyyy/MM/dd"
                                label="Pet admitted date"
                                //helperText="No year selection"
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
                                this.setState({ attributeValue: this.props.dateValue.value });
                                this.closePopUp() 
                            } }
                            style={ this.styleMatUI.closeButton }	
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button onClick={ () => { 
                                //this.setState({ attributeValue:this.state.attributeValue });
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
				trackerInstanceId: this.state.trackerInstanceId,
				columnName: this.state.columnName,
				value: this.state.attributeValue
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
        console.log("custom datepicker mount: props:", this.props, "state:", this.state);
    }
}


const mapStateToProps = (state, props) => {
    return {
        //dateData: props,
        dateValue: state.ticketsDataReducer.ticketsData.find( tracker => (
            tracker.instanceId === props.trackerInstanceId
        ) ).columnData.find( col => (
            col.name === props.columnName
        ) )
    };
}


//export default CustomDatePicker;
export default connect(mapStateToProps)(CustomDatePicker);


