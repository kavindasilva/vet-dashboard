
import React from 'react';
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

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import Tree from "material-ui-tree";
import getNodeDataByPath from "material-ui-tree/lib/util";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import EditableCell from "../config/editableCell"

import TrackersPemissionsConfig from "../config/trackersPermissionsConfig"
import TrackerRulesConfig from "../config/trackersRulesConfig"
import NewTracker from "../config/newTracker"
import ColumnDataType from "../config/columnDataType"
import NewColumn from "../config/newColumn"
import NewRule from "../config/newRule"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse } from '@material-ui/core';

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

/**
 * Main component for the all trackers config data viewing
 */
class TrackersConfig extends React.Component{
    classes=this.props.classes;
	state = { 
        metaData: this.props.metaData,
        trackerConfigData: this.props.trackers,

        /** current viewing tracker */      
        tabValue:0,

        /** component to show */            
        componentToShow:"allTrackers",

        attributeValue: "",

        //columnName: this.props.
        rowEdited:[],
        rowCollapsed:[],
    }

	componentDidMount(){
		//console.log("TrackersConfig - mount. json:", this.state.trackers); 
        //console.log("TrackersConfig - mount. props.metaData:", this.props.metaData); 
        this.getTrackersConfig();
    }
    
    componentWillReceiveProps( newProps ){
		console.log("TrackersConfig - receiveNewProps:", newProps); 
        if( newProps.trackers !== this.state.trackerConfigData ){
            this.setState({trackerConfigData: newProps.trackers});
        }
    }

	render(){
		return(
			<React.Fragment>
                <small>config ui</small>
				{ 
                    //this.viewAllTrackers() 
                    this.showComponent() 
                }
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
     * View Tabs layout of all trackers
     */
	viewAllTrackers(){
		//console.log("TrackersConfig - viewAllTrackers:", this.state.trackers); 

		return(
			<div>
                <div>
                    <Button 
                        style={{
                            float: "right",
                            align: "right",
                        }}
                        onClick={ ()=>{
                            this.setState({componentToShow: "newTracker"})
                        } }
                    >
                        Add New Tracker
                    </Button>
                <hr/>

                    {/* <Button 
                        style={{
                            float: "right",
                            align: "right",
                        }}
                        onClick={ ()=>{
                            this.setState({componentToShow: "newTracker"})
                        } }
                    >
                        Save Trackers
                    </Button>
                    <Button 
                        style={{
                            float: "right",
                            align: "right",
                        }}
                        onClick={ ()=>{
                            this.setState({ trackersConfigData: null }, ()=>{
                                this.getTrackersConfig();
                            })
                            
                        } }
                    >
                        Cancel
                    </Button> */}
                </div>
                


				<AppBar position="static" color="default">
                    <Tabs
                        value={this.state.tabValue}
                        onChange={ this.handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >    
                        {
                            this.props.trackers.map( tracker => (
                                <Tab 
                                    label={ tracker.name } 
                                    key={ tracker.name } 
                                />
                            ))
                        }
                    </Tabs>
                </AppBar>
                {
                    this.props.trackers.map( tracker => (
                        (this.state.tabValue+1) === tracker.tracker_id && 
                        <React.Fragment key ={tracker.tracker_id}>
                            <small> 
                                ID: {tracker.tracker_id} ,
                                Name: { tracker.name } 
                            </small>


                            <Button 
                                style={{
                                    float: "right",
                                    align: "right",
                                }}
                                onClick={ ()=>{
                                    this.saveTrackerToDB(tracker.tracker_id)
                                } }
                            >
                                Save Tracker Config
                            </Button>
                            <Button 
                                style={{
                                    float: "right",
                                    align: "right",
                                }}
                                onClick={ ()=>{
                                    this.setState({ trackersConfigData: null }, ()=>{
                                        this.getTrackersConfig();
                                    })
                                    
                                } }
                            >
                                Cancel
                            </Button>
                            <NewColumn 
                                tracker_id={ tracker.tracker_id }
                            />


                            <div>
                            {
                                this.showColumns(tracker)
                            }
                            </div>

                            <NewColumn 
                                tracker_id={ tracker.tracker_id }
                            />
                            
                        </React.Fragment>
                    ) )
                }

			</div>
		);
    }
    
    /**
     * show the tracker-config columns of a provided tracker
     */
    showColumns = (tracker) => {
        let columns = tracker.columns;
        return(
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name(API)</TableCell>
                        <TableCell>Label</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Users</TableCell>
                        <TableCell>Rules</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                {
                    columns.map( column =>(
                        <TableRow key={ column.name }>
                            {/* collapse/extend arrow */}
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                <span
                                    onClick={ () => 
                                        this.markRowCollapsed(
                                            column.name,
                                            this.state.rowCollapsed[column.name]
                                        )
                                    }
                                >
                                { 
                                    (this.state.rowCollapsed[column.name])
                                    ?<ArrowDown />
                                    :<ArrowRight />
                                }
                                </span>
                            </TableCell>

                            {/* name */}
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                <EditableCell 
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }
                                    value={column.name}
                                    attribute="name"
                                >
                                </EditableCell>
                            </TableCell>

                            {/* label */}
                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                <EditableCell 
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }
                                    value={column.label}
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
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }

                                    value={column.type}
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
                                <Collapse 
                                    hidden={!this.state.rowCollapsed[column.name]} 
                                    in={this.state.rowCollapsed[column.name]}
                                    //timeout={ { enter:10, exit:10 } }
                                >
                                {
                                    column.permissions.map( user => (
                                        <React.Fragment key ={user.userId}>
                                            <TrackersPemissionsConfig
                                                tracker_id={ tracker.tracker_id }
                                                column_name={ column.name }
                                                user_id ={user.userId}
                                                key ={user.userId}
                                            />
                                            <br/>
                                        </React.Fragment>
                                    ) )
                                    
                                }
                                </Collapse>
                            </TableCell>


                            <TableCell 
                                m={0} p={0} size="small"
                                className={ this.props.classes.configTopAlignedCell }
                            >
                                <Collapse 
                                    hidden={!this.state.rowCollapsed[column.name]} 
                                    //hidden={ false } 
                                    in={this.state.rowCollapsed[column.name]}
                                    //in={ true }
                                >

                                    <TrackerRulesConfig
                                        tracker_id={ tracker.tracker_id }
                                        column_name={ column.name }
                                    >
                                    </TrackerRulesConfig>
                                    {/* <NewRule 
                                        tracker_id={ tracker.tracker_id }
                                        column_name={ column.name }
                                    /> */}
                                    
                                </Collapse>
                            
                            </TableCell>

                        </TableRow>                
                    ) )
                }
                </TableBody>
            </Table>
        );
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

    /**
     * to check single row is edited. // not used
     */
    markRowEdited = (columnName) => {
        let rowEditedData = { ...this.state.rowEdited };
        rowEditedData[columnName] = true
        this.setState({ rowEdited: rowEditedData });
    }
    

    /**
     * Retrieve tracker configuration information from API
     * 
     * Update store with new data
     */
    getTrackersConfig(){
        trackersAPIobj.getTrackerConfig()
        .then(
            res => {
                console.log("trackers config res:", res.data);
                this.setState({ trackersConfigData: res.data }, function(){
                    rootStore.dispatch({
                        type: 'GET_CONFIG_FROM_DB',
                        payload: {
                            data: this.state.trackersConfigData
                        }
                    });
                });
                //this.setState({trackersConfigData:null});
            }
        )
        .then(
            this.setState({trackersConfigData:null})
        )
    }

    saveTrackerToDB( trackerId ){
        
        rootStore.dispatch({
            type: 'SAVE_CONFIG_TO_DB',
            payload: {
                trackerId: trackerId
            }
        });
    }


}

const mapStateToProps = state => {
	console.log('trackerConfig.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        trackers: state.TrackConfigReducer.configData,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(TrackersConfig));

