
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField } from "@material-ui/core";

class EditableCell extends React.Component{
    state= {
        componentState: "read",

        label: this.props.label,

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
            label: this.props.label,
            componentState:"read"
        })
    }

    dispatchColumnNameUpdate = ( ) => {
        //return;
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_LABEL',
			payload: {
				trackerId: this.state.trackerId,
                columnName: this.state.columnName,
                
				value: this.state.label,
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
                    value={ this.state.label }
                    onChange={ (e)=>{ this.setState({label: e.target.value}) } }
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
                this.state.label
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
