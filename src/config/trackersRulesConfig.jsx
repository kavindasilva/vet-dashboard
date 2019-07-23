
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
import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, TextField, IconButton, MenuItem, Select, Collapse } from "@material-ui/core";

import TrackerRulesColor from "../config/trackerRulesColor"
import TrackerRulesCondition from "../config/TrackerRulesCondition"
import NewRule from "../config/newRule"


import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { colouringRuleColors } from "../common/constants"
/** to be imported from costants */
/*const colouringRuleColors = {
    "green": "Green",
    "amber": "Amber",
    "red": "Red",
    "blue": "Blue",
    "grey": "Grey",
}*/

class TrackersRulesConfig extends React.Component{

    state ={
        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,
        isOpen: this.props.show,
        attributeValue: this.props.value,

        columnRules: this.props.columnRules,

        open: false,
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
                                this.props.columnRules.map( (rule, i) => (
                                    <TableRow >
                                        
                                        {/* buttons */}
                                        <TableCell m={0} p={0} size="small">
                                            <IconButton 
                                                aria-label="Delete" size="small"
                                                onClick={ () => this.swapRulePosition("up", i) }
                                            >
                                                <ArrowUpwardIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton 
                                                aria-label="Delete" size="small"
                                                onClick={ () => this.swapRulePosition("down", i) }
                                            >
                                                <ArrowDownwardIcon fontSize="inherit"  />
                                            </IconButton>
                                        </TableCell>


                                        {/* color */}
                                        <TableCell m={0} p={0} size="small">
                                        { 
                                            "p-"+rule.precedence+"-"+rule.bgcolor
                                        }
                                        
                                        <TrackerRulesColor
                                            tracker_id={ this.state.trackerId }
                                            column_name={ this.state.columnName }
                                            precedence_id={ rule.precedence }

                                            value={ rule.bgcolor }
                                            attribute="bgcolor"
                                            predefinedData={ colouringRuleColors }
                                        />
                                        
                                        </TableCell >

                                        
                                        {/* conditions */}
                                        <TableCell m={0} p={0} size="small">
                                            <TrackerRulesCondition
                                                tracker_id={ this.state.trackerId }
                                                column_name={ this.state.columnName }
                                                precedence_id={ rule.precedence }

                                                value={ rule.conditions }
                                                attribute="conditions"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ) )
                            )
                            :"no rules"
                    
                    }
                    <TableRow>
                        <TableCell colSpan={3}>
                            {/* new rule adding button */}
                            <NewRule 
                                tracker_id={ this.props.tracker_id }
                                column_name={ this.props.column_name }

                                nextPrecedence={ 
                                    (this.props.columnRules.length>0)
                                    ?(this.props.columnRules.length + 1)
                                    :1
                                }
                            />
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </React.Fragment>
  
        )
    }

    swapRulePosition = ( direction, index ) => {
        if(direction==="up"){
            if(index===0)
                return null;

            console.log("going up");
            rootStore.dispatch({
                type: 'UPDATE_CONFIG_RULE_UP',
                payload: {
                    trackerId: this.state.trackerId,
                    columnName: this.state.columnName,
                    
                    ruleIndex: index,
                }
            });
        }
        else if(direction==="down"){
            if(index === this.props.columnRules.length-1)
                return null;
            
            console.log("going down");
            rootStore.dispatch({
                type: 'UPDATE_CONFIG_RULE_DOWN',
                payload: {
                    trackerId: this.state.trackerId,
                    columnName: this.state.columnName,
                    
                    ruleIndex: index,
                }
            });

        }
    }
    
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


