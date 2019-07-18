
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
import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, TextField, IconButton, MenuItem, Select } from "@material-ui/core";

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

/** to be imported from costants */
const colouringRuleColors = [
    { value: "green", label: "Green" },
    { value: "amber", label: "Amber" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "grey", label: "Grey" },
]

class TrackersRulesConfig extends React.Component{

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
        ticketId: this.props.ticketId,
        columnName: this.props.columnName,
        isOpen: this.props.show,
        attributeValue: this.props.value,
    }

    render(){
        //console.log("trackerRulesConfig props:", this.props);
        //return(<div></div>);
        return(
            <React.Fragment>
                <Table size="small">
                    <TableBody>
                    {
                        ( this.props.columnRules.length > 0 )?
                            (
                                this.props.columnRules.map( rule => (
                                    <TableRow >
                                        
                                        {/* buttons */}
                                        <TableCell m={0} p={0} size="small">
                                            <IconButton aria-label="Delete" size="small">
                                                <ArrowUpwardIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="Delete" size="small">
                                                <ArrowDownwardIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>

                                        {/* color */}
                                        <TableCell m={0} p={0} size="small">
                                        { 
                                            "p-"+rule.precedence
                                        }
                                        {
                                            <Select value={ rule.bgcolor } 
                                                //onChange={ e => this.setState({ attributeValue: e.target.value }) }
                                                fullWidth={true}
                                            >
                                                {
                                                    colouringRuleColors.map( item =>
                                                            <MenuItem key={ item.value } value={ item.value } >{ item.label }</MenuItem>
                                                        )
                                                }
                                            </Select>
                                        }
                                        
                                        </TableCell >
                                        
                                        {/* conditions */}
                                        <TableCell m={0} p={0} size="small">
                                            <TextField
                                                value={ rule.conditions }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ) )
                            )
                            :"no rules"
                    
                    }
                    </TableBody>
                </Table>
                
            
            </React.Fragment>
  
        )
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    
    componentDidMount(){
        //console.log("trackerRulesConfig arr: :", this.props.allUsers );
        //console.log("trackerRulesConfig mount: props:", this.props, "state:", this.state);
    }
}


const mapStateToProps = (state, props) => {
	//state.TrackConfigReducer.configData;
	let configValue = state.TrackConfigReducer.configData.find( tracker => (
		tracker.tracker_id === parseInt( props.tracker_id )
	) );
    return {
        columnRules: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.column_name
		) )
		.rules,
		
        allUsers: { ...state.UserConfigReducer.userData, 
            ...state.UserConfigReducer.partnerData 
        },
        //allUsers: [ ...state.UserConfigReducer.userData]
    };
}


export default connect(mapStateToProps)(TrackersRulesConfig);


