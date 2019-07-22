
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";


import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, TextField, IconButton, MenuItem, Select, Collapse, Button, DialogActions, DialogContent, Dialog } from "@material-ui/core";

import TrackerRulesColor from "../config/trackerRulesColor"
import TrackerRulesCondition from "../config/TrackerRulesCondition"


import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { colouringRuleColors } from "../common/constants"


class NewRule extends React.Component{

    state ={
        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,

        isOpen: this.props.show,

        condition: "",
        bgcolor: "grey",
        precedence: 4, //auto increment

        columnRules: this.props.columnRules,

        isOpen: false,
    }

    render(){
        return(
            <React.Fragment>
                <Button
                    onClick={ ()=>(
                        this.setState({ isOpen: true })
                    ) }
                >
                    New Rule
                </Button>
                {
                    this.newRuleRow()
                }
            </React.Fragment>
        );
    }

    newRuleRow(){
        return(
            <React.Fragment>
                
                <Dialog
                    open={this.state.isOpen} 
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                   
                        <Table size="small">
                            <TableBody>
                                <TableRow >
                                    
                                    {/* buttons */}
                                    <TableCell m={0} p={0} size="small">
                                        <IconButton 
                                            aria-label="Delete" size="small"
                                            onClick={ () => this.swapRulePosition("up", 1) }
                                        >
                                            <ArrowUpwardIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton 
                                            aria-label="Delete" size="small"
                                            onClick={ () => this.swapRulePosition("down", 1) }
                                        >
                                            <ArrowDownwardIcon fontSize="inherit"  />
                                        </IconButton>
                                    </TableCell>


                                    {/* color */}
                                    <TableCell m={0} p={0} size="small">
                                    { 
                                        "p-"+this.state.precedence+"-"+this.state.bgcolor
                                    }
                                    
                                    <TrackerRulesColor
                                        tracker_id={ this.state.trackerId }
                                        column_name={ this.state.columnName }
                                        precedence_id={ this.state.precedence }

                                        value={ this.state.bgcolor }
                                        attribute="bgcolor"
                                        predefinedData={ colouringRuleColors }
                                    />
                                    
                                    </TableCell >

                                    
                                    {/* conditions */}
                                    <TableCell m={0} p={0} size="small">
                                        <TrackerRulesCondition
                                            tracker_id={ this.state.trackerId }
                                            column_name={ this.state.columnName }
                                            precedence_id={ this.state.precedence }

                                            value={ this.state.conditions }
                                            attribute="conditions"
                                        />
                                    </TableCell>
                                </TableRow>
                            
                            }
                            </TableBody>
                        </Table>
                            
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ ()=>{
                                this.setState({ attributeValue: this.props.value });
                                this.closePopUp() 
                            } }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button onClick={ () => { 
                                this.dispatchUpdate()
                                this.closePopUp(); 
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


export default connect(mapStateToProps)(NewRule);


