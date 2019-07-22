
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes } from "../common/constants"


class TrackerRulesColor extends React.Component{
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
            <Select
                //value={ this.state.attributeValue } 
                value={ this.props.columnRuleColor }
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
                                    precedenceId: this.state.precedence,
                                }
                            })
                        })
                    }
                }
                fullWidth={false}
            >
                {
                    Object.keys(this.state.selectListData).map( item =>
                            <MenuItem key={ item } value={ item } >{ this.state.selectListData[item] }</MenuItem>
                        )
                }
            </Select>
        )
    }

    dispatchColumnNameUpdate = ( ) => {
        //return;
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_ATTR',
			payload: {
				trackerId: this.state.trackerId,
                columnName: this.state.columnName,
                
                value: this.state.value,
                attribute: this.props.attribute,
			}
		});
    }

}



const mapStateToProps = (state, props) => {
    return {
        columnRuleColor: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.column_name
		) )
        .rules.find(rule => (
            rule.precedence === props.precedence_id
        ) )
        .bgcolor,
        
    };
}

export default connect(mapStateToProps)(TrackerRulesColor);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
