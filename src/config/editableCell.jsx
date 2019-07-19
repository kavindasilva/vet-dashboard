
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
            // <input type="text" value={this.state.value} 
            //     onChange={ (e)=>{ this.setState({value: e.target.value}) } }
            //     onBlur={ ()=>{ this.handleAccept() } }
            //     ></input>
            <TextField
                value={ this.state.value }
                onChange={ (e)=>{ this.setState({value: e.target.value}) } }
                // onKeyDown={ (e)=>{
                //     if(e.keyCode===27)
                //         this.handleReject();
                //     else if(e.keyCode===13)
                //         this.handleAccept();
                // } }
                onBlur={ ()=>{ this.handleAccept() } }
            />
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

export default connect(mapStateToProps)(EditableCell);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
