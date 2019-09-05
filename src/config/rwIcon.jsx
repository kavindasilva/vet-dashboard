
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem, IconButton } from "@material-ui/core";

class RWIcon extends React.Component{
    state= {
        trackerId: this.props.trackerId,
        columnName: this.props.columnName,
        user_type_id: this.props.user_type_id,

        rwType: this.props.rwType,
        //rwcValue: (this.props.rwValue===1)?false:true, /** receives restricted/not */
        rwcValue: this.props.rwValue,
    }

    render(){
        return(
            <IconButton
                size="small"
                style={
                    (this.state.rwcValue)?
                        { "backgroundColor":"green" }
                        :{ "textDecoration": "line-through", "backgroundColor":"red" }
                }
                onClick = { () => { 
                    this.setState({rwcValue: !this.state.rwcValue}, function(){
                        this.dispatchPermissionsUpdate()
                    });
                } }
            >
                { this.props.label }
            </IconButton>
        )
            
    }

    componentWillReceiveProps( newProps ){
        //let newRwc = (newProps.rwValue===1)?false:true;
        if( newProps.rwValue !== this.state.rwcValue ){
            this.setState({rwcValue: newProps.rwValue});
        }
    }

    dispatchPermissionsUpdate = ( ) => {
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_USER_PERMISSIONS',
			payload: {
				trackerId: this.state.trackerId,
                columnName: this.state.columnName,
                
                user_type_id: this.state.user_type_id,
                
                rwType: this.state.rwType,
                rwcValue: (this.state.rwcValue===false)?1:0,
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
