
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";


import * as validateRules from "../common/validateRule"

/**
 * re-usable component for tracker rule's condition. <not used>
 */
class TrackerRuleConditionText extends React.Component{
    state= {
        attributeValue: (this.props.value)?(this.props.value):"",
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
            this.setState({attributeValue: newProps.columnRule.conditions}, ()=>
                this.validateExpr(this.state.attributeValue)
            )
    }

    render(){
        return(
            <TextField
                value={ this.state.attributeValue }
                onChange={ (e)=>{ this.validateExpr(e.target.value) } }
                onBlur={ () => this.props.updateParent() }
                fullWidth={false}
                style={ (this.state.statementError) ?this.state.cellStyleError :this.state.cellStyleNormal }
            />
        )
    }

    validateExpr = (val) => {
        this.setState({attributeValue: val});
        let evalResult=null;

        evalResult = validateRules.validateExpression(val);

        if(evalResult.error === false)
            this.setState({statementError: false})
        else
            this.setState({statementError: true})

        console.log("TrackerRuleConditionText expr",  evalResult);
    }

    componentDidMount(){
        this.validateExpr(this.state.attributeValue);
    }

}



const mapStateToProps = (state, props) => {
    return {};
}

export default connect(mapStateToProps)(TrackerRuleConditionText);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
