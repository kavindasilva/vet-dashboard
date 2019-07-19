
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes } from "../common/constants"


class ColumnDataCell extends React.Component{
    state= {
        componentState: "read",

        attributeValue: this.props.value,
        attributeName: this.props.attribute,

        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,

        //selectListData: trackerColumnDataTypes,
        selectListData: this.props.predefinedData,
    }

    render(){
        return(
            <Select
                value={ this.state.attributeValue } 
                onChange={
                    e => {
                        this.setState({attributeValue: e.target.value}, function(){
                            rootStore.dispatch({
                                type: 'UPDATE_CONFIG_ATTR',
                                payload: {
                                    trackerId: this.state.trackerId,
                                    columnName: this.state.columnName,
                                    
                                    value: parseInt(this.state.attributeValue),
                                    attribute: this.state.attributeName,
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
            <TableCell style={{color:"red"}}
                //onBlur={ ()=>{console.log("blur")} }
                //on ={ ()=>{console.log("blur")} }
                //onClick={ ()=> { this.setState({componentState: ""}) } }
            >
                <TextField
                    value={ this.state.value }
                    onChange={ (e)=>{ this.setState({value: e.target.value}) } }
                    onKeyDown={ (e)=>{
                        if(e.keyCode===27)
                            this.handleReject();
                        else if(e.keyCode===13)
                            this.handleAccept();
                    } }
                />           
            </TableCell>
        )
    }

    /**
     * print read only table cell
     */
    sendReadOnly(){
        return(
            <TableCell style={{color:"green"}}
                onClick={ ()=> { this.setState({componentState: ""}) } }            
            >
            {
                this.state.value
            }
            </TableCell>
        )
    }
}



const mapStateToProps = (state, props) => {
    return {};
}

export default connect(mapStateToProps)(ColumnDataCell);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
