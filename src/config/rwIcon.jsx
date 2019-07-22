
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem, IconButton } from "@material-ui/core";

class RWIcon extends React.Component{
    state= {
        trackerId: this.props.trackerId,
        columnName: this.props.columnName,
        userId: this.props.userId,

        rwType: this.props.rwType,
        rwValue: this.props.rwValue,
    }

    render(){
        return(
            <IconButton
                size="small"
                style={
                    (this.state.rwValue)?
                        { "backgroundColor":"green" }
                        :{ "text-decoration": "line-through", "backgroundColor":"red" }
                }
                onClick = { () => { 
                    this.setState({rwValue: !this.state.rwValue}, function(){
                        this.dispatchPermissionsUpdate()
                    });
                } }
            >
                { this.props.label }
            </IconButton>
        )
            
    }

    componentWillReceiveProps( newProps ){
        if( newProps.rwValue !== this.state.rwValue ){
            this.setState({rwValue: newProps.rwValue});
        }
    }

    dispatchPermissionsUpdate = ( ) => {
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_USER_PERMISSIONS',
			payload: {
				trackerId: this.state.trackerId,
                columnName: this.state.columnName,
                
                userId: this.state.userId,
                
                rwType: this.state.rwType,
                rwValue: this.state.rwValue,
			}
		});
    }
}



const mapStateToProps = (state, props) => {
    return {};
}

export default connect(mapStateToProps)(RWIcon);

/**
 * js onKeyDown codes
 * 
 * esc: 27
 * enter: 13
 */
