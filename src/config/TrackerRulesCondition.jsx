
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes } from "../common/constants"

import Peg from "../parsers/conditionsParser";


class TrackerRulesCondition extends React.Component{
    state= {
        //attributeValue: this.props.value,
        attributeValue: (this.props.columnRule)?(this.props.columnRule.conditions):"",
        attributeName: this.props.attribute,

        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,
        precedence: this.props.precedence_id,

        statementError: false,
        cellStyleNormal: { backgroundColor:"transparent" },
        cellStyleError: { backgroundColor:"yellow" },
    }

    componentWillReceiveProps(newProps){
        if(newProps.columnRule && newProps.columnRule.conditions !== this.state.attributeValue)
            this.setState({attributeValue: newProps.columnRule.conditions})
    }

    render(){
        return(
            <TextField
                //value={ (this.props.columnRule)?(this.props.columnRule.conditions):this.state.attributeValue }
                //onChange={ (e)=>{ this.setState({attributeValue: e.target.value}) } }
                value={ this.state.attributeValue }
                onChange={ (e)=>{ this.validateExpr(e.target.value) } }
                onBlur={ ()=>{ 
                    rootStore.dispatch({
                        type: 'UPDATE_CONFIG_RULE_CONDITION',
                        payload: {
                            trackerId: this.state.trackerId,
                            columnName: this.state.columnName,
                            
                            precedenceConditions: this.state.attributeValue,
                            attribute: this.state.attributeName,
                            precedenceId: this.props.columnRule.precedence,
                        }
                    })
                } }
                fullWidth={false}
                style={ (this.state.statementError) ?this.state.cellStyleError :this.state.cellStyleNormal }
            />
        )
    }

    validateExpr = (val) => {
        this.setState({attributeValue: val});

        let ast = {}; let error = ''; 
        let res=null;

        try { 
            res = Peg.parse(val);
            //res = Peg.parse(this.state.attributeValue);
            this.setState({statementError: false});
        } catch (ex) {
            res = ex.message;
            this.setState({statementError: true});
        }

        console.log("TrackerRulesCondition expr",  res);
    }

    componentDidMount(){
        this.validateExpr(this.state.attributeValue);
    }

}



const mapStateToProps = (state, props) => {
    return {
        columnRule: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.column_name
		) )
        .rules.find(rule => (
            rule.precedence === props.precedence_id
        ) ),
        //.conditions,
        
    };
}

export default connect(mapStateToProps)(TrackerRulesCondition);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
