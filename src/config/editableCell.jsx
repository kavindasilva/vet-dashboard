//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField } from "@material-ui/core";

class EditableCell extends React.Component{
    state= {
        componentState: "read",

        value: this.props.value,

        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,
    }

    render(){
        return this.viewCell();
    }

    componentWillReceiveProps( newProps ){
        //console.log("TrackerRulesCondition willrecieve props", this.props.columnRule.conditions);
        if( newProps.value !== this.state.value ){
            this.setState({value: newProps.value});
        }

    }

    viewCell(){
        switch(this.state.componentState){
            case "read":
                return this.sendReadOnly();
            case "edit":
                return this.sendTextBox();

            default:
                return this.sendTextBox();
        }
    }

    /** on Enter is pressed */
    handleAccept = () => {
        this.dispatchColumnNameUpdate();
        this.setState({componentState:"read"})
    }

    /** when Esc pressed in editable mood */
    handleReject= () => {
        this.setState({
            value: this.props.value,
            componentState:"read"
        })
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

    /**
     * return editable table cell
     */
    sendTextBox(){
        return(
            <TextField
                value={ this.state.value }
                onChange={ (e)=>{ this.setState({value: e.target.value}) } }
                onBlur={ ()=>{ this.handleAccept() } }
            />
        )
    }

    /**
     * print read only table cell
     */
    sendReadOnly(){
        return(
            <span style={{color:"green"}}
                onClick={ ()=> { this.setState({componentState: ""}) } }            
            >
            {
                this.state.value
            }
            </span>
        )
    }
}



const mapStateToProps = (state, props) => {
    return {};
}

export default connect(mapStateToProps)(EditableCell);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
