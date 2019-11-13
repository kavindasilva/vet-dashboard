//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes, colouringRuleColors } from "../common/constants"

import StopIcon from "@material-ui/icons/Stop"

class TrackerRulesColor extends React.Component{
    state= {
        valueInStore: this.props.value,

        attributeValue: this.props.value,
        attributeName: this.props.attribute,

        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,
        precedence: (this.props.columnRule)?this.props.columnRule.precedence:this.props.precedence_id,

        //selectListData: this.props.predefinedData,
        selectListData: colouringRuleColors,
    }

    render(){
        return(
            <Select
                value={ 
                    (this.props.columnRule) 
                    ?this.props.columnRule.bgcolor
                    :this.state.attributeValue
                }
                onChange={
                    e => {
                        this.setState({attributeValue: e.target.value}, function(){
                            rootStore.dispatch({
                                type: 'UPDATE_CONFIG_RULE_COLOR',
                                payload: {
                                    trackerId: this.state.trackerId,
                                    columnName: this.state.columnName,
                                    
                                    precedenceColor: this.state.attributeValue,
                                    attribute: this.state.attributeName,
                                    precedenceId: this.props.columnRule.precedence,
                                }
                            })
                        })
                    }
                }
                fullWidth={false}
            >
                {
                    Object.keys(this.state.selectListData).map( item =>
                        <MenuItem 
                            key={ item } 
                            value={ this.state.selectListData[item].colorCode.toString() } 
                        >
                            <StopIcon
                                style={ {
                                    color:this.state.selectListData[item].colorCode.toString(), 
                                    //backgroundColor:"green"
                                } }
                            />
                        { 
                            this.state.selectListData[item].label.toString() 
                        }
                        </MenuItem>
                    )
                }
            </Select>
        )
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};

}



const mapStateToProps = (state, props) => {
    let trackerRes = state.TrackConfigReducer.configData.find( tracker => (
        tracker.tracker_id === parseInt( props.tracker_id )
    ) );
    if(!trackerRes){
        console.log("TrackersRulesColor tracker not found");
        return;
    }

    let columnRes = trackerRes.columns.find( column => (
        column.name === props.column_name
    ) );
    if(!columnRes){
        console.log("TrackersRulesColor column not found");
        return;
    }

    let ruleRes = columnRes.color_rules.find(rule => (
        rule.precedence === props.precedence_id
    ) );

    return {
        columnRule:ruleRes
    };
}

export default connect(mapStateToProps)(TrackerRulesColor);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
