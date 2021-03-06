//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";


import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead, TextField, IconButton, MenuItem, Select, Collapse, DialogActions, DialogContent, Dialog } from "@material-ui/core";

import Button from "react-bootstrap/Button"
import TrackerRulesColor from "../config/trackerRulesColor"
import TrackerRulesCondition from "../config/TrackerRulesCondition"

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StopIcon from "@material-ui/icons/Stop"

import { colouringRuleColors } from "../common/constants"
import * as validateRules from "../common/validateRule"

/**
 * adding a new conditon
 * 
 * adds a whole rule at once
 */
class NewRule extends React.Component{

    state ={
        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,

        isOpen: this.props.show,

        conditions: "",
        bgcolor: "#5e6875",
        precedence: this.props.nextPrecedence, //auto increment

        //columnRules: this.props.columnRules,

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
                                    
                                    {/* color */}
                                    <TableCell m={0} p={0} size="small">
                                    { 
                                        "p-"+this.props.nextPrecedence+"-"+this.state.bgcolor
                                    }
                                        <Select
                                            value={ this.state.bgcolor }
                                            onChange={ e => this.setState({bgcolor: e.target.value}) }
                                            fullWidth={false}
                                        >
                                            {
                                                Object.keys(colouringRuleColors).map( item =>
                                                    <MenuItem 
                                                        key={ item } 
                                                        value={ colouringRuleColors[item].colorCode.toString() } 
                                                    >
                                                        <StopIcon
                                                            style={ {
                                                                color: colouringRuleColors[item].colorCode.toString(), 
                                                                //backgroundColor:"green"
                                                            } }
                                                        />
                                                    { 
                                                        colouringRuleColors[item].label.toString()
                                                    }
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    
                                    </TableCell >

                                    
                                    {/* conditions */}
                                    <TableCell m={0} p={0} size="small">
                                        <TextField
                                            value={ this.state.conditions }
                                            onChange={ (e)=>{ this.setState({conditions: e.target.value}) } }
                                            
                                            fullWidth={false}
                                        />
                                        
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                            
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ ()=>{
                                //this.setState({ attributeValue: this.props.value });
                                this.closePopUp() 
                            } }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button onClick={ () => { 
                                this.saveNewCondition();
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

    saveNewCondition = (  ) => {
        if(1){
            rootStore.dispatch({
                type: 'ADD_CONFIG_RULE_NEW',
                payload: {
                    trackerId: this.state.trackerId,
                    columnName: this.state.columnName,

                    precedenceId: this.props.nextPrecedence,
                    bgcolor: this.state.bgcolor,
                    conditions: this.state.conditions,
                    //ruleIndex: index,
                }
            });
        }
    }
    
    componentDidMount(){
        //console.log("trackerRulesConfig arr: :", this.props.allUsers );
        //console.log("trackerRulesConfig mount: props:", this.props, "state:", this.state);
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
}


const mapStateToProps = (state, props) => {
    // let trackerRes = state.TrackConfigReducer.configData.find( tracker => (
    //     tracker.tracker_id === parseInt( props.tracker_id )
    // ) );
    // if(!trackerRes){
    //     console.log("newRule tracker not found");
    // }

    // let columnRes = trackerRes.columns.find( column => (
    //     column.name === props.column_name
    // ) )
    // if(!columnRes){
    //     console.log("newRule column not found");
    // }

    return {
        // columnRules: columnRes.rules,
		
        // allUsers: { ...state.UserConfigReducer.userData, 
        //     ...state.UserConfigReducer.partnerData 
        // },
        //allUsers: [ ...state.UserConfigReducer.userData]
    };
}


export default connect(mapStateToProps)(NewRule);


