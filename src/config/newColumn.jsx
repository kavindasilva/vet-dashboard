
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import EditableCell from "../config/editableCell"

import TrackersPemissionsConfig from "../config/trackersPermissionsConfig"
import TrackerRulesConfig from "../config/trackersRulesConfig"
import NewTracker from "../config/newTracker"
import ColumnDataType from "../config/columnDataType"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Typography, Step, StepLabel, TextField } from '@material-ui/core';

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
 * New column is added for a tracker
 */
class NewColumn extends React.Component{
    classes=this.props.classes;
    steps = this.getSteps();

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
		//console.log("NewColumn - mount. json:", this.state.trackers); 
        //console.log("NewColumn - mount. props.metaData:", this.props.metaData); 
    }
    
    render(){
        return(
            <React.Fragment>
                <Button 
                    style={{ float: "right", align: "right",}}
                    onClick={ ()=>(
                        this.setState({ isOpen: true })
                    ) } 
                >
                    Add
                </Button>

                {/* popup modal UI */}
                <Dialog
                    open={this.state.isOpen} 
                    onClose={this.closePopUp}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogContent>
                        { this.viewSteps() }
                    </DialogContent>
                </Dialog>
            
            </React.Fragment>
        );
    }

    viewSteps = () =>{
        return (
            <div >
                <Stepper activeStep={this.state.activeStep}>
                {
                    this.steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })
                }
                </Stepper>
                <div>
                {
                    this.state.activeStep === this.steps.length 
                    ?( // contradiction
                        <div>
                            <Typography >
                                All steps completed - you&apos;re finished
                            </Typography>
                        </div>
                    ) 
                    :(
                        <div>
                            <Typography >
                            {
                                this.getStepContent(this.state.activeStep)
                            }
                            </Typography>

                            <div>
                                <Button 
                                    onClick={ ()=> this.closePopUp() }
                                    variant="text"
                                    color="primary"
                                >
                                    Cancel
                                </Button>

                                <Button 
                                    disabled={this.state.activeStep === 0} 
                                    onClick={ ()=>{
                                        let prevStep= this.state.activeStep - 1;
                                        this.setState({activeStep: prevStep})
                                    } } 
                                >
                                    Back
                                </Button>

                                {
                                    this.state.activeStep === this.steps.length - 1 
                                    ?<Button 
                                        onClick={ () => { 
                                            this.saveNewColumn()
                                            this.closePopUp(); 
                                        } } 
                                        variant="text" color="primary"
                                    >
                                        OK
                                    </Button> 
                                    :<Button
                                        variant="contained"
                                        color="primary"
                                        onClick={ ()=>{
                                            let nextStep= this.state.activeStep + 1;
                                            this.setState({activeStep: nextStep})
                                        } } 
                                    >
                                        Next
                                    </Button>
                                }
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
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

    /** step labels */
    getSteps(){
        return [
            'Column name from API', 
            'Label to display', 
            'Data type'
        ];
    }
    
    /** step content related body and input elements */
    getStepContent(step){
        switch(step){
            case 0:
                return(
                    <TextField
                        value={ this.state.columnName }
                        onChange={ (e)=> this.setState({columnName: e.target.value}) }
                        attribute="label"
                        label={ "columnName" }
                    >
                    </TextField>
                );

            case 1:
                return(
                    <TextField
                        value={ this.state.columnLabel }
                        onChange={ (e)=> this.setState({columnLabel: e.target.value}) }
                        attribute="label"
                        label={ "columnLabel" }
                    >
                    </TextField>
                );
            
            case 2:
                return(
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
                );

            default:
                return "def step";
        }
    }

    openPopUp = () => {
		this.setState({ isOpen: true });
	};

	closePopUp = () => {
		this.setState({ isOpen: false });
	};
    

}

const mapStateToProps = state => {
	console.log('NewColumn.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        trackers: state.TrackConfigReducer.configData,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(NewColumn));

