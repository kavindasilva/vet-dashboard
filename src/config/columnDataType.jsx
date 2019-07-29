
import React, { Component } from "react";

import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore";
import { TableCell, TextField, Select, MenuItem } from "@material-ui/core";

import { trackerColumnDataTypes } from "../common/constants"

/**
 * displays the data type of a selected tracker-config's column
 * 
 * redux store updating function included
 */
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

    //getDerivedStateFromProps
    componentWillReceiveProps( newProps ){
        if( newProps.value !== this.state.attributeValue ){
            this.setState({attributeValue: newProps.value});
        }
    }

    /*dispatchColumnNameUpdate = ( ) => {
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
    }*/

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
