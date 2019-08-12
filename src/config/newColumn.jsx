import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import AddIcon from '@material-ui/icons/Add'
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import EditableCell from "../config/editableCell"

import TrackersPemissionsConfig from "../config/trackersPermissionsConfig"
import TrackerRulesConfig from "../config/trackersRulesConfig"
import NewTracker from "../config/newTracker"
import ColumnDataType from "../config/columnDataType"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Typography, Step, StepLabel, TextField, Fab } from '@material-ui/core';

import ArrowRight from "@material-ui/icons/ArrowRight"
import ArrowDown from "@material-ui/icons/ArrowDropDown"
import { isThisSecond } from 'date-fns';


const trackersAPIobj = new trackersAPI();

const useStyles = theme => ({
    configTopAlignedCell: {
        verticalAlign: 'top'
    },
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});


/**
 * New column adding component for a tracker
 * 
 * Renders dialog viewing button
 * 
 * Dialog box is hidden default
 */
class NewColumn extends React.Component{
    classes=this.props.classes;

	state ={
        trackerId: this.props.tracker_id,

        columnName: "",
        columnLabel: "",
        columnDataType: 1,

        isOpen: false,

        conditions: "",
        bgcolor: "grey",
        precedence: this.props.nextPrecedence, //auto increment

        activeStep: 0,
    }

	componentDidMount(){
		//if(APP_MODE==="DEBUG")console.log("NewColumn - mount. json:", this.state.trackers); 
        //if(APP_MODE==="DEBUG")console.log("NewColumn - mount. props.metaData:", this.props.metaData); 
    }
    
    render(){
        return(
            <React.Fragment>
                <Fab 
                    size="small" variant="extended" aria-label="Add"
                    style={{ float: "right", align: "right",}}
                    onClick={ ()=>(
                        this.setState({ isOpen: true })
                    ) } 
                >
                    <AddIcon /> Column
                </Fab>
                       
                {/* popup modal UI */}
                <Dialog
                    open={this.state.isOpen} 
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        { this.columnDataCaptureForm() }
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            onClick={ ()=> this.closePopUp() }
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>

                        
                        <Button
                            variant="text"
                            color="primary"
                            onClick={ ()=>{
                                this.saveNewColumn();
                                this.closePopUp();
                            } } 
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
        );
    }

    columnDataCaptureForm = () =>{
        return (
            <Table size="small">
                <TableBody>
                    <TableRow >
                        
                        {/* columnName  - should be equal to API json key */}
                        <TableCell m={0} p={0} size="small">
                            <TextField
                                value={ this.state.columnName }
                                onChange={ (e)=> this.setState({columnName: e.target.value}) }
                                attribute="label"
                                label={ "columnName" }
                            />
                        </TableCell>
                        
                        {/* column label */}
                        <TableCell m={0} p={0} size="small">
                            <TextField
                                value={ this.state.columnLabel }
                                onChange={ (e)=> this.setState({columnLabel: e.target.value}) }
                                attribute="label"
                                label={ "columnLabel" }
                            />
                        </TableCell>

                        {/* column data type */}
                        <TableCell m={0} p={0} size="small">
                            <Select
                                value={ this.state.columnDataType }
                                onChange={ e => this.setState({columnDataType: e.target.value}) }
                                fullWidth={false}
                            >
                            {
                                Object.keys(trackerColumnDataTypes).map( item =>
                                    <MenuItem key={ item } value={ item } >
                                    { 
                                        trackerColumnDataTypes[item] 
                                    }
                                    </MenuItem>
                                )
                            }
                            </Select>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }

    saveNewColumn =() =>{
        rootStore.dispatch({
            type: 'ADD_CONFIG_COLUMN_NEW',
            payload: {
                trackerId: this.state.trackerId,
                //columnName: this.state.columnName,

                columnName: this.state.columnName,
                columnLabel: this.state.columnLabel,
                columnDataType: this.state.columnDataType,

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

const mapStateToProps = (state, props) => {
    //if(APP_MODE==="DEBUG")console.log('NewColumn.jsx-mapStateToProps', state);
    let trackerRes = state.TrackConfigReducer.configData.find( tracker => (
        tracker.tracker_id === parseInt( props.tracker_id )
    ) );
    if(!trackerRes){
        if(APP_MODE==="DEBUG")console.log("newColumn tracker not found");
    }

	return {
        columnData: trackerRes.columns,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(NewColumn));

