//import {APP_MODE} from "../common/constants"
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

import trackerAPI from "../apicalls/trackersAPI"
const trackerAPIObj = new trackerAPI();

class NewTracker extends React.Component{
    state ={
        trackerName:"",
        trackerPipeline: "",
        HSPipelines: [{"id": "679579", "label": "Potential Onboarding Pipeline"}],
    }

    render(){
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
                        value={ this.state.trackerName }
                        onChange={ e => this.setState({trackerName: e.target.value}) }
                        label="Tracker Name"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Select value={ this.state.trackerPipeline } 
                        onChange={ e => this.setState({ trackerPipeline: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            this.state.HSPipelines.map( item =>
                                <MenuItem 
                                    key={ item.id.toString() } 
                                    value={ item.id.toString() } 
                                >
                                { item.id.toString() + " - " + item.label.toString() }
                                </MenuItem>
                            )
                        }
                    </Select>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Button
                        label="Save Button"
                        fullWidth
                        onClick={ ()=>{
                            trackerAPIObj.saveNewTracker(
                                {
                                    name: this.state.trackerName,
                                    pipeline_id: this.state.trackerPipeline,
                                    columns: [],
                                }
                            )
                        } }
                    >
                        Save
                    </Button>
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
        trackerAPIObj.getAvailablePipelines()
        .then(
            res => {
                console.log("newTracker pipelines res:", res.data);
                if(res && res.data)
                    this.setState({HSPipelines: res.data });
                else
                    this.setState({HSPipelines: [{"id": "999", "label": "Error loading pipelines"}] });
            }
        )
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


