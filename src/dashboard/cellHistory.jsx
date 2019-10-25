//import {APP_MODE} from "../common/constants"
import React, { Component } from "react";
import '@y0c/react-datepicker/assets/styles/calendar.scss';

import { withStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
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
import HistoryIcon from '@material-ui/icons/History';
import { Tooltip, IconButton } from "@material-ui/core";
const ticketAPIObj = new ticketAPI();


const useStyles = theme => ({
    root: {
      width: '100%',
    },
    paper: {
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
});

class CellHistory extends Component {
	state = {
        isOpen: false,
        historyData: null,

        page: 0,
		rowsPerPage: 5,
	}

  	render() {
		//console.log('trackerPopup: Rendering cell content');
		return (
			<React.Fragment>
                <Tooltip title="History">
                    <Button
                        size="sm"
                        variant="info"
                        disabled={ (this.props.ticket_property_id)? false: true }
                        onClick={ ()=>this.getHistoryData() }    
                    >
                        <HistoryIcon fontSize="small" />
                    </Button>
                </Tooltip>

                <Dialog
                    fullWidth={ true }
                    maxWidth="lg"
                    open={this.state.isOpen} // not ok
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" >
						Cell history
                    </DialogTitle>

                    <DialogContent>
                        <div className={this.props.classes.root}>
                            <Paper className={this.props.classes.paper}>
                                <Table className={this.props.classes.table} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell><TableCell>User</TableCell><TableCell>Value</TableCell><TableCell>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        (this.state.historyData && this.state.historyData.length>0 )
                                        ?(
                                            this.state.historyData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map( (history, i) => (  
                                                <TableRow key={i} >
                                                    <TableCell>{history.edit_date}</TableCell>
                                                    <TableCell>{history.username}</TableCell>
                                                    <TableCell>{history.value}</TableCell>
                                                    <TableCell>{history.description}</TableCell>
                                                </TableRow>
                                            ))
                                        )
                                        :<TableRow><TableCell colSpan={4}>no history</TableCell></TableRow>
                                    }
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={(this.state.historyData)? this.state.historyData.length: 0}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                    'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                    'aria-label': 'next page',
                                    }}
                                    onChangePage={ (e, newPage) => { this.setState({page: newPage}) } }
                                    onChangeRowsPerPage={ (e) => {
                                        this.setState({rowsPerPage: e.target.value, page: 0 });
                                    } }
                                />
                            </Paper>
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ (e) => { 
                                this.closePopUp(); 
                            } } 
                            variant="outline-primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
		)
    }

    /**
     * opens the popup
     * gets history data from API
     */
    getHistoryData = () => {
        this.setState({ isOpen: true });
        ticketAPIObj.retrieveCellHistory(this.props.ticket_property_id)
        .then(
            res => {
                if(res && res.data)
                    this.setState({historyData: res.data})
                else
                    this.setState({historyDataDump: res})
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


export default connect(mapStateToProps)(withStyles(useStyles)(CellHistory));


