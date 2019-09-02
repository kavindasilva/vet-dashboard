//import {APP_MODE} from "../common/constants"
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
 * Component for the all trackers columns data viewing
 */
class TrackersConfigColumns extends React.Component{
    classes=this.props.classes;
	state = { 
        trackerColumnConfigData: this.props.tracker,
        trackersHash: this.props.trackerColsHash, // this is to fix bug: new column added not shown immediately
        //trackersHash: JSON.stringify(this.props.tracker), 

        rowCollapsed:[],
    }
   
    componentWillReceiveProps( newProps ){
        console.log("TrackersColumnsConfig - receiveNewProps:", newProps); 
        // if( JSON.stringify(this.props.tracker) !== this.state.trackersHash ){
        //     this.setState({trackersHash: JSON.stringify(this.props.tracker)});
        // } //not working
        if( newProps.trackerColsHash !== this.state.trackersHash ){
            this.setState({trackersHash: newProps.trackerColsHash});
        }
    }

	render(){
        //console.log("trackreConfigColumn col count:", this.state.columnCount);
		return(
			<React.Fragment>
				{ 
                    this.showColumns() 
                }
			</React.Fragment>
		)
    }
    
    /**
     * show the tracker-config columns of a provided tracker
     */
    showColumns = () => {
        //let columns = tracker.columns;
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
                    this.props.tracker.columns.map( column =>(
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
                                    tracker_id={ this.props.tracker.tracker_id }
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
                                    tracker_id={ this.props.tracker.tracker_id }
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
                                <ColumnDataType
                                    tracker_id={ this.props.tracker.tracker_id }
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
                                    // hidden={!this.state.rowCollapsed[column.name]} 
                                    // in={this.state.rowCollapsed[column.name]}
                                    hidden={ false }
                                    in={true}
                                    //timeout={ { enter:10, exit:10 } }
                                >
                                {
                                    column.permissions.map( user => (
                                        <React.Fragment key ={user.userTypeId}>
                                            <TrackersPemissionsConfig
                                                tracker_id={ this.props.tracker.tracker_id }
                                                column_name={ column.name }
                                                user_type_id ={user.userTypeId}
                                                key ={user.userTypeId}
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
                                        tracker_id={ this.props.tracker.tracker_id }
                                        column_name={ column.name }
                                    >
                                    </TrackerRulesConfig>
                                    
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
    


}

const mapStateToProps = (state, props) => {
	console.log('trackerColumnConfig.jsx-mapStateToProps', state, props);
	return {
        metaData: state.MetaReducer.metaData,
        tracker: state.TrackConfigReducer.configData.find( tracker => (
            tracker.tracker_id === props.tracker_id
        ) ),

        trackerColsHash: JSON.stringify(state.TrackConfigReducer.configData.find( tracker => (
            tracker.tracker_id === props.tracker_id
        ) )), // this is to fix bug: new column added / cancel edits not shown immediately,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(TrackersConfigColumns));

