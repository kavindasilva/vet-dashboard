
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Tree from "material-ui-tree";
import getNodeDataByPath from "material-ui-tree/lib/util";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import EditableCell from "../config/editableCell"

import TrackersPemissionsConfig from "../config/trackersPermissionsConfig"
import TrackerRulesConfig from "../config/trackersRulesConfig"
import NewTracker from "../config/newTracker"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select } from '@material-ui/core';

const trackersAPIobj = new trackersAPI();

const useStyles = theme => ({
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


class TrackersConfig extends React.Component{
    classes=this.props.classes;
	state = { 
        ...this.props.metaData,
        ...this.props.trackers,

        /** current viewing tracker */      tabValue:0,
        /** component to show */            componentToShow:"allTrackers",

        //columnName: this.props.
        rowEdited:[],
    }

	componentDidMount(){
		//console.log("TrackersConfig - mount. json:", this.state.trackers); 
        //console.log("TrackersConfig - mount. props.metaData:", this.props.metaData); 
        this.getTrackersConfig();
	}

	render(){
		return(
			<React.Fragment>config ui
				{ 
                    //this.viewAllTrackers() 
                    this.showComponent() 
                }
			</React.Fragment>
		)
    }

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
                                <Tab label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.props.trackers.map( tracker => (
                        (this.state.tabValue+1) === tracker.tracker_id && 
                        <React.Fragment>
                            <small> 
                                ID: {tracker.tracker_id} ,
                                Name: { tracker.name } 
                            </small>

                            <Button 
                                style={{
                                    float: "right",
                                    align: "right",
                                }}
                            >
                                Add Column
                            </Button>
                            
                            <div>
                            {
                                this.showColumns(tracker)
                            }
                            </div>
                        </React.Fragment>
                    ) )
                }

			</div>
		);
    }
    
    showColumns = (tracker) => {
        let columns = tracker.columns;
        return(
            <Table size="small">
                <TableHead>
                    <TableCell>Label</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Rules</TableCell>
                </TableHead>
                
                <TableBody>
                {
                    columns.map( column =>(
                        <TableRow>
                            <EditableCell 
                                m={0} p={0} size="small"

                                tracker_id={ tracker.tracker_id }
                                column_name={ column.name }
                                label={column.label+"L"}
                            > 
                                {column.label}
                            </EditableCell>
                            
                            <TableCell m={0} p={0} size="small"> 
                            {
                                //trackerColumnDataTypes[column.type]
                                <Select
                                    value={ column.type } 
									onChange={ e => this.setState({ attributeValue: e.target.value }) }
									fullWidth={false}
								>
									{
										Object.keys(trackerColumnDataTypes).map( item =>
												<MenuItem key={ item } value={ item } >{ trackerColumnDataTypes[item] }</MenuItem>
											)
									}
								</Select>
                            }
                            </TableCell>
                            
                            <TableCell m={0} p={0} size="small">
                            {
                                column.permissions.map( user => (
                                    <React.Fragment>
                                        <TrackersPemissionsConfig
                                            tracker_id={ tracker.tracker_id }
                                            column_name={ column.name }
                                            user_id ={user.userId}
                                            //user_read={permit.read.toString() }
                                            //user_write={permit.write.toString() }
                                        />
                                        <br/>
                                    </React.Fragment>
                                ) )
                                
                            }
                            </TableCell>

                            <TableCell m={0} p={0} size="small">
                                <TrackerRulesConfig
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }
                                >
                                </TrackerRulesConfig>
                            
                            </TableCell>

                            {/* <TableCell>
                                <Button
                                    disabled={ 
                                        (this.state.rowEdited[column.name]) ?
                                        false : true
                                    }
                                >
                                    Save
                                </Button>
                            </TableCell> */}

                        </TableRow>                
                    ) )
                }
                </TableBody>
            </Table>
        );
    }

    markRowEdited = (columnName) => {
        let rowEditedData = { ...this.state.rowEdited };
        rowEditedData[columnName] = true
        this.setState({ rowEdited: rowEditedData });
    }

    
    showColumns2 = (columns) => {
        return columns.map( column =>(
            <div>
                Name: { column.name } -->
                Label: { column.label }
                
                <Tree
                    title="Material UI Tree"
                    data={ column.permissions }
                    labelKey="path"
                    valueKey="sha"
                    childrenKey="tree"
                    foldIcon={<ArrowDropUpIcon />}
                    unfoldIcon={<ArrowDropUpIcon />}
                    loadMoreIcon={<ArrowDropUpIcon />}
                    //renderLabel={renderLabel}
                    renderLoadMoreText={(page, pageSize, total) =>
                        `Loaded: ${(page + 1) *
                        pageSize} / Total: ${total}. Click here to load more...`
                    }
                    pageSize={10}
                    actionsAlignRight={false}
                    // getActionsData={getActionsData}
                    // requestChildrenData={requestChildrenData}
                />
            </div> 
        ) )
    }

    

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
            }
        )
    }


}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        trackers: state.TrackConfigReducer.configData,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(TrackersConfig));

