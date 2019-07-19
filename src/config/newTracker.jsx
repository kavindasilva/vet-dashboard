
import React, { Component } from "react";

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
import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, FormControlLabel, IconButton, Grid, Select, MenuItem, TextField, RadioGroup } from "@material-ui/core";

import { spacing } from '@material-ui/system';

class NewTracker extends React.Component{
    state ={
        
    }

    render(){
        //console.log('NewTracker: Rendering cell content');
        //return(<React.Fragment>x</React.Fragment>);
        return(
            <React.Fragment>
            {
                this.showForm()
            }
            </React.Fragment>
  
        )
    }

    showForm(){
        return(
            <Grid container spacing={3}>
                {/* tracker name */}
                <Grid item xs={12} sm={12}>
                    <TextField
                        id="trackerName"
                        name="trackerName"
                        label="Tracker Name"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Select value={ this.state.attributeValue } 
                        //onChange={ e => this.setState({ attributeValue: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            ["pipeline","data","from","hubspot"].map( item =>
                                    <MenuItem key={ item } value={ item } >{ item }</MenuItem>
                                )
                        }
                    </Select>
                </Grid>

            </Grid>
        
        )
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    
    componentDidMount(){
    
    }
}


const mapStateToProps = (state, props) => {
	
    return {
        allUsers: { ...state.UserConfigReducer.userData, 
            ...state.UserConfigReducer.partnerData 
        },
    };
}


export default connect(mapStateToProps)(NewTracker);


