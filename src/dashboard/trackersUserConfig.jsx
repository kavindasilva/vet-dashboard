
import React, { Component } from "react";

import { connect } from "react-redux";
import rootReducer from "../reducers/index";

import { rootStore } from "../stores/mainStore";
import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table, TableBody, TableRow, TableCell, Checkbox, TableHead } from "@material-ui/core";

class TrackersUserConfig extends React.Component{

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
        ticketId: this.props.ticketId,
        columnName: this.props.columnName,
        isOpen: this.props.show,
        attributeValue: this.props.value,
    }

    render(){
        //console.log('TrackersUserConfig: Rendering cell content');
        //return(<React.Fragment></React.Fragment>);
        return(
            <React.Fragment>
                <div style={this.styleTD}
                    onClick={ ()=>(
                        this.setState({ isOpen: true })
                        ) } 
                >
                    { String(
						(this.props.columnPermissions)?
						( JSON.stringify(this.props.columnPermissions).substr(0,40) )
						:"--" 
					) }
                </div>

                {/* popup modal UI */}
                <Dialog
                    open={this.state.isOpen} 
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" 
						style={
							{ ...this.styleMatUI.titleBarPrimary,  padding: "18px 24px 16px 24px" }
						}
                    >

                        Change { this.state.attributeName }
                    </DialogTitle>

                    <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell>Read</TableCell>
                                    <TableCell>Write</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.columnPermissions.map( user => (
                                        <TableRow>
                                            <TableCell>{ user.userId }</TableCell>
                                            
                                            <TableCell>
                                                <Checkbox
                                                    key={ user.userId }
                                                    checked={ user.read }
                                                    value="read"
                                                    label="Read"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Checkbox
                                                    key={ user.userId }
                                                    checked={ user.write }
                                                    value="write"
                                                    label="Write"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ) )
                                
                                }
                            </TableBody>
                        </Table>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ ()=>{
                                this.setState({ attributeValue: this.props.value });
                                this.closePopUp() 
                            } }
                            style={ this.styleMatUI.closeButton }	
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                                            
                        <Button onClick={ () => { 
                                this.dispatchUpdate()
                                this.closePopUp(); 
                            } } 
                            variant="text" color="primary"
                            style={this.styleMatUI.closeButton} >OK
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
  
        )
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    
    componentDidMount(){
        //console.log("custom datepicker mount: props:", this.props, "state:", this.state);
    }
}


const mapStateToProps = (state, props) => {
	//state.TrackConfigReducer.configData;
	let configValue = state.TrackConfigReducer.configData.find( tracker => (
		tracker.tracker_id === parseInt( props.tracker_id )
	) );
    return {
        columnPermissions: state.TrackConfigReducer.configData.find( tracker => (
			tracker.tracker_id === parseInt( props.tracker_id )
		) )
		.columns.find( column => (
			column.name === props.columnName
		) )
		.permissions,
		
		users: state.UserConfigReducer.userData,
    };
}


export default connect(mapStateToProps)(TrackersUserConfig);


