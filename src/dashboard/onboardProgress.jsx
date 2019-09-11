//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Popup from "reactjs-popup";
import CustomDatePicker from "../dashboard/datePicker";
import InstantPopup from "../dashboard/instantPopup";
//import SmallPop from "../dashboard/smallPop";

import TableCell from '@material-ui/core/TableCell';

import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import { trackerPopupDefaultValues, globalStyles } from "../common/constants";

import Moment from 'react-moment';
import moment from "moment";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import  * as Rule from "../dashboard/colouringFunctions"
import Peg from "../parsers/conditionsParser"
import { IconButton } from "@material-ui/core";

class onboardProgress extends Component {
	state = {
        isOpen: false,
	}

  	render() {
		//console.log('onboardPopup: Rendering cell content');
		return (
			<React.Fragment>
				<IconButton 
                        size="small"
                        onClick={ ()=>this.setState({isOpen: true}) }
                    >
                        o
						{ this.showPop() }
                </IconButton>

				<Dialog
                    open={this.state.isOpen}
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" 
                    style={
                        { padding: "18px 24px 16px 24px" }
                    }
                    >
                        Change { this.state.attributeName }
                    </DialogTitle>

                    <DialogContent></DialogContent>

					<DialogActions>
						<Button
							onClick={ ()=>this.setState({isOpen: false}) }
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
					
			</React.Fragment>
		)
	}

	showPop(){
		
	}

	componentDidMount(){
		console.log("onboardPopup didmount props:", this.props);

	}

}


const mapStateToProps = (state, props) => {
	//console.log('onboardPopup.jsx-mapStateToProps', state);
	console.log('onboardPopup.jsx-props1', props);
}


export default connect(mapStateToProps)(onboardProgress);


