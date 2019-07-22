
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes } from "../common/constants"


class TrackerRulesCondition extends React.Component{
    state= {
        attributeValue: this.props.value,
        attributeName: this.props.attribute,

        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,
        precedence: this.props.precedence_id,

        //selectListData: trackerColumnDataTypes,
        selectListData: this.props.predefinedData,
    }

    render(){
        return(
            <TextField
                //value={ this.state.attributeValue } 
                value={ this.props.columnRuleConditions }
                onChange={
                    e => {
                        this.setState({attributeValue: e.target.value}, function(){
                            rootStore.dispatch({
                                type: 'UPDATE_CONFIG_RULE_CONDITION',
                                payload: {
                                    trackerId: this.state.trackerId,
                                    columnName: this.state.columnName,
                                    
                                    precedenceConditions: this.state.attributeValue,
                                    attribute: this.state.attributeName,
                                    precedenceId: this.state.precedence,
                                }
                            })
                        })
                    }
                }
                //onChange={ (e)=>{ this.setState({attributeValue: e.target.value}) } }
                //onBlur={ ()=>{ this.handleAccept() } }
                fullWidth={false}
            />
        )
    }

}



const mapStateToProps = (state, props) => {
    return {
        columnRuleConditions: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.column_name
		) )
        .rules.find(rule => (
            rule.precedence === props.precedence_id
        ) )
        .conditions,
        
    };
}

export default connect(mapStateToProps)(TrackerRulesCondition);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
