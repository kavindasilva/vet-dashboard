
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";


class TrackerConfigCell extends React.Component{

    styleMatUI={
		closeButton: {
			cursor:'pointer', 
			float:'right', 
			marginTop: '5px', 
			width: '20px',
			align: 'right'
		},

		titleBarThin:{
			padding: "0 24 0 24"
		},

		titleBarPrimary:{
			color:"white", "backgroundColor":"#3c4fb0"
		}
    }
    styleTD={
		width: "100%" ,
		minHeight: "18px",
		color: "#111111"
	}
    
    state ={
        trackerId: this.props.trackerId,
        columnName: this.props.columnName,
        isOpen: this.props.show,
        attributeValue: this.props.value,
    }

    render(){
        return(
            <React.Fragment>
                TrackerConfigCell
            </React.Fragment>
        )
    }

    dispatchUpdate = () => {
        rootStore.dispatch({
			type: 'UPDATE_CONFIG_COLUMN00',
			payload: {
				trackerId: this.state.trackerId,
				columnName: this.state.columnName,
				value: this.state.attributeValue
			}
		});
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    
}



//export default connect(mapStateToProps)(TrackerConfigCell);
export default TrackerConfigCell;

