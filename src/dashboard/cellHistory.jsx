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

//import Rule from "../dashboard/colouringFunctions"
import  * as Rule from "../dashboard/colouringFunctions"
import Peg from "../parsers/conditionsParser"

import ticketAPI from "../apicalls/ticketAPI"
const ticketAPIObj = new ticketAPI();


class CellHistory extends Component {
	state = {
        historyData: null,
	}

  	render() {
		//console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
                <Button onClick={ ()=>this.getHistoryData() }>History</Button>

                <Dialog
                    open={this.state.isOpen} // not ok
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" >
						Cell history
                    </DialogTitle>

                    <DialogContent>
                        history data <br/>
                        <table>
                            <thead>
                                <tr> <th>date</th> <th>user</th> <th>value</th> <th>description</th> </tr>
                            </thead>
                            <tbody>
                            {
                                (this.state.historyData)
                                ?(
                                    this.state.historyData.map( (history, i) => (  
                                        <tr key={i} >
                                            <td>{history.edit_date}</td>
                                            <td>{history.user_id}</td>
                                            <td>{history.value}</td>
                                            <td>{history.description}</td>
                                        </tr>
                                    ))
                                )
                                :<tr><td colSpan='4'>no history</td></tr>
                            }
                            </tbody>
                        </table>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ (e) => { 
                                this.closePopUp(); 
                            } } 
                            variant="text" color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
		)
    }


    getHistoryData = () => {
        this.setState({ isOpen: true });
        ticketAPIObj.retrieveCellHistory(this.props.ticketPropertyId)
        .then(
            res => {
                if(res && res.data)
                    this.setState({historyData: res.data})
                else
                    this.setState({historyData: res})
            }
        );
    }
    
    closePopUp = () => this.setState({ isOpen: false });

	
}


const mapStateToProps = (state, props) => {
	//console.log('trackerPopup.jsx-mapStateToProps', state);
    //console.log('trackerPopup.jsx-props1', props);
    
    return {};
}


export default connect(mapStateToProps)(CellHistory);


