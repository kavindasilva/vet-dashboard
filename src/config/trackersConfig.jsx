
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

import TrackerUserConfig from "../config/trackersUserConfig"
import TrackerRulesConfig from "../config/trackersRulesConfig"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';

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

        tabValue:0,
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
                    this.viewTabs() 
                }
			</React.Fragment>
		)
    }
    
    handleChange = (event, newValue) => {
        this.setState({tabValue: newValue});
    }

	/** 
     * View Tabs layout of all trackers
     */
	viewTabs(){
		//console.log("TrackersConfig - viewTabs:", this.state.trackers); 

		return(
			<div>
                <Button 
                    style={{
                        float: "right",
                        align: "right",
                    }}
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
                    ))
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
                            <TableCell m={0} p={0} size="small"> {column.label} </TableCell>
                            <TableCell m={0} p={0} size="small"> 
                            {
                                trackerColumnDataTypes[column.type]
                            }
                            </TableCell>
                            
                            <TableCell m={0} p={0} size="small">
                            {
                                <TrackerUserConfig
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }
                                    //user_id ={permit.userId}
                                    //user_read={permit.read.toString() }
                                    //user_write={permit.write.toString() }
                                />
                            }
                            </TableCell>

                            <TableCell m={0} p={0} size="small">
                                <TrackerRulesConfig
                                    tracker_id={ tracker.tracker_id }
                                    column_name={ column.name }
                                >
                                </TrackerRulesConfig>
                            
                            </TableCell>

                        </TableRow>                
                    ) )
                }
                </TableBody>
            </Table>
        );
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

