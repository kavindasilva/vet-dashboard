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

import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import { trackerPopupDefaultValues, globalStyles } from "../common/constants";

import moment from "moment";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

import  * as Rule from "../dashboard/colouringFunctions"
import Peg from "../parsers/conditionsParser"

import ticketAPI from "../apicalls/ticketAPI"
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Tooltip, IconButton } from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
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

class CellComment extends Component {
	state = {
        isOpen: false,
        commentData: null,

        newComment: '',
	}

  	render() {
		//console.log('CellComment: Rendering cell content');
		return (
			<React.Fragment>
                <Tooltip title="Comment">
                    <span>
                        <Button
                            size="sm"
                            style={ !this.props.ticket_property_id ? { pointerEvents: "none" } : {}}
                            variant="secondary"
                            disabled={ (this.props.ticket_property_id)? false: true }
                            onClick={ ()=>this.getCommentsData() }    
                        >
                            <InsertCommentIcon fontSize="small" />
                        </Button>
                    </span>
                </Tooltip>

                <Dialog
                    fullWidth={ true }
                    maxWidth="lg"
                    open={this.state.isOpen} // not ok
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" >
						Cell Comments
                    </DialogTitle>

                    <DialogContent>
                        <div className={this.props.classes.root}>
                            <Paper className={this.props.classes.paper}>
                                <Form.Group controlId="validationCustomUsername">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">Comment</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        
                                        <Form.Control
                                            type="text"
                                            placeholder="Comment"
                                            aria-describedby="inputGroupPrepend"
                                            value={ this.state.newComment }
                                            onChange={ (e)=>this.setState(
                                                    {newComment: e.target.value }
                                            )}
                                        />

                                        <Button
                                            onClick={ ()=>this.addComment() }
                                        >
                                            Add
                                        </Button>
 
                                    </InputGroup>
                                </Form.Group>

                                <Table className={this.props.classes.table} size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Added date</TableCell><TableCell>User</TableCell><TableCell>Comment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        (this.state.commentData && this.state.commentData.length>0 )
                                        ?(
                                            this.state.commentData.map( (comment, i) => (  
                                                <TableRow key={i} >
                                                    <TableCell>{comment.added_time}</TableCell>
                                                    <TableCell>{comment.username}</TableCell>
                                                    <TableCell>{comment.comment}</TableCell>
                                                </TableRow>
                                            ))
                                        )
                                        :<TableRow><TableCell colSpan={4}>no comments</TableCell></TableRow>
                                    }
                                    </TableBody>
                                </Table>
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


    addComment = () => {
        ticketAPIObj.addCellComment({
            ticket_property_id: this.props.ticket_property_id,
            comment: this.state.newComment
        })
        .then(
            res => {
                this.getCommentsData();
            }
        )
    }

    /**
     * opens the popup
     * gets history data from API
     */
    getCommentsData = () => {
        this.setState({ isOpen: true });
        ticketAPIObj.retrieveCellComments(this.props.ticket_property_id)
        .then(
            res => {
                if(res && res.data)
                    this.setState({commentData: res.data})
                else
                    this.setState({commentDataDump: res})
            }
        );
    }
    
    closePopUp = () => this.setState({ isOpen: false });

	
}


const mapStateToProps = (state, props) => {
	//console.log('CellComment.jsx-mapStateToProps', state);
    //console.log('CellComment.jsx-props1', props);
    
    return {};
}


export default connect(mapStateToProps)(withStyles(useStyles)(CellComment));


