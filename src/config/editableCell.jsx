
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { TableCell, TextField } from "@material-ui/core";

class EditableCell extends React.Component{
    state= {
        componentState: "read",
        //value: this.props

        label: this.props.label,
        tracker_id: this.props.tracker_id,
        column_name: this.props.column_name,
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
        //update store
        this.setState({componentState:"read"})
    }

    handleReject= () => {
        this.setState({
            label: this.props.label,
            componentState:"read"
        })
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
