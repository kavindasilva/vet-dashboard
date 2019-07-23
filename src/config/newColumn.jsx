
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
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Typography, Step, StepLabel } from '@material-ui/core';

import ArrowRight from "@material-ui/icons/ArrowRight"
import ArrowDown from "@material-ui/icons/ArrowDropDown"


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

function getSteps(){
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step){
    switch(step){
        case 1:
            return "step 1";
        default:
            return "def step";
    }
}

/**
 * New column is added for a tracker
 */
class NewColumn extends React.Component{
    classes=this.props.classes;
    steps = getSteps();

	state ={
        trackerId: this.props.tracker_id,
        columnName: this.props.column_name,

        isOpen: false,

        conditions: "",
        bgcolor: "grey",
        precedence: this.props.nextPrecedence, //auto increment

        activeStep: 1,
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
                        { this.step1() }
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ ()=>{
                                this.setState({ attributeValue: this.props.value });
                                this.closePopUp() 
                            } }
                            //style={ this.styleMatUI.closeButton }	
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
                            //style={this.styleMatUI.closeButton} 
                        >
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </React.Fragment>
        );
    }

    step1 = () =>{
        return (
            <div >
                <Stepper activeStep={this.state.activeStep}>
                {
                    this.steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        // labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        // }
                        // if (isStepSkipped(index)) {
                        // stepProps.completed = false;
                        // }
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
                    ?(
                        <div>
                        <Typography >
                            All steps completed - you&apos;re finished
                        </Typography>
                        {/* <Button onClick={handleReset} >
                            Reset
                        </Button> */}
                        </div>
                    ) 
                    :(
                        <div>
                            <Typography >
                            {
                                getStepContent(this.state.activeStep)
                            }
                            </Typography>

                            <div>
                                <Button 
                                    disabled={this.state.activeStep === 0} 
                                    //onClick={handleBack} 
                                >
                                    Back
                                </Button>
                                {(
                                <Button
                                    variant="contained"
                                    color="primary"
                                    //onClick={handleSkip}
                                >
                                    Skip
                                </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    //onClick={handleNext}
                                >
                                {
                                    this.state.activeStep === this.steps.length - 1 
                                    ?'Finish' 
                                    :'Next'
                                }
                                </Button>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        );
    }

	columnStructure(){
		return(
			<React.Fragment>
                <Table size="small">
                    <TableHead>
                        <TableCell>Label</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Users</TableCell>
                        <TableCell>Rules</TableCell>
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            {/* label */}
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                                //style={{ verticalAlign: 'top' }}
                            >
                                <span
                                    // onClick={ () => 
                                    //     this.markRowCollapsed(
                                    //         column.name,
                                    //         this.state.rowCollapsed[column.name]
                                    //     )
                                    // }
                                >
                                { 
                                    (this.state.rowCollapsed["name"])
                                    ?<ArrowDown />
                                    :<ArrowRight />
                                }
                                </span>

                                <EditableCell 
                                    //tracker_id={ tracker.tracker_id }
                                    //column_name={ column.name }
                                    //value={column.label}
                                    attribute="label"
                                >
                                </EditableCell>
                            </TableCell>

                            {/* data type */}
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            > 
                            {
                                //trackerColumnDataTypes[column.type]
                                <ColumnDataType
                                    tracker_id={ this.props.tracker_id }
                                    column_name={ "column.name" }

                                    value={"text"}
                                    attribute="type"
                                    predefinedData={ trackerColumnDataTypes }

                                />
                            }
                            </TableCell>

                            {/* user persmissions */}                            
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                
                            </TableCell>


                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                
                            
                            </TableCell>

                        </TableRow>                
                    }
                    </TableBody>
                </Table>
        
			</React.Fragment>
		)
    }

    /** renders the desired component */
    showComponent = () => {
        switch(this.state.componentToShow){
            case "allTrackers":
                return this.viewAllTrackers();

            case "newTracker":
                return(
                    <React.Fragment>
                        <NewTracker />
                        <Button
                            onClick={ () => {
                                this.setState({componentToShow: "allTrackers"})
                            } }
                        >
                            Cancel
                        </Button>
                    </React.Fragment>
                );

            default:
                return <div>default component</div>
        }
    }
    
    /** handles tab change */
    handleChange = (event, newValue) => {
        this.setState({tabValue: newValue});
    }

    /**
     * to check single row is collapsed/expaned.
     * 
     * columnName: column name
     * 
     * collapsed: current status of collapsed or not
     * 
     * state ={
     *  rowCollapsedData:[
     *      "column_name": <bool>
     *  ]
     * }
     */
    markRowCollapsed = (columnName, collapsed) => {
        let rowCollapsedData = { ...this.state.rowCollapsed };
        rowCollapsedData[columnName] = !collapsed
        this.setState({ rowCollapsed: rowCollapsedData });
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

