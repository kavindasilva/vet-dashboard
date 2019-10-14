//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import DateFnsUtils from "@date-io/date-fns";
import {format} from "date-fns";

import {  DatePicker,  TimePicker,  DateTimePicker,  MuiPickersUtilsProvider } from "@material-ui/pickers";

import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AppBar from '@material-ui/core/AppBar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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
import TrackersConfigColumns from "../config/trackersConfigColumns"

import { trackerColumnDataTypes } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import userAPI from "../apicalls/userAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse } from '@material-ui/core';

import ArrowRight from "@material-ui/icons/ArrowRight"
import ArrowDown from "@material-ui/icons/ArrowDropDown"

const trackersAPIobj = new trackersAPI();
const userAPIObj = new userAPI();

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
        tabValue:2,

        /** component to show */            
        componentToShow:"allTrackers",

        attributeValue: "",

        errorGetTrackerConfigs: false,
        errorMsgGetTrackerConfigs: false,
    }

	componentDidMount(){
		//console.log("TrackersConfig - mount. json:", this.state.trackers); 
        //console.log("TrackersConfig - mount. props.metaData:", this.props.metaData); 
        this.getTrackersConfig();
        this.getPartnersList();
    }
    
    componentWillReceiveProps( newProps ){
		console.log("TrackersConfig - receiveNewProps:", newProps); 
        if( newProps.trackers !== this.state.trackerConfigData ){
            this.setState({trackerConfigData: newProps.trackers});
        }
    }

	render(){
        if(this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3)
            return(
                <React.Fragment>You are not auth to view this page</React.Fragment>
            )
        else
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
                

                </div>
                {
                    (this.props.trackers && !this.state.errorGetTrackerConfigs)
                    ? <Tabs 
                        id="controlled-tab-example" 
                        activeKey={ this.state.viewingTabTrackerId } 
                        onSelect={ this.handleTabChange }
                    >
                    {
                        this.props.trackers.map( (tracker, trackerIndex) => (
                            <Tab 
                                key={ trackerIndex } 
                                eventKey={ tracker.tracker_id } 
                                title={ tracker.name } 
                            >
                                <Button 
                                    style={{
                                        float: "right",
                                        align: "right",
                                        margin: "2px 2px 2px 2px",
                                    }}
                                    variant="success"
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
                                        margin: "2px 2px 2px 2px",
                                    }}
                                    variant="outline-warning"
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
                                    <TrackersConfigColumns 
                                        tracker_id={ tracker.tracker_id }
                                    />
                                </div>

                                <Button 
                                    style={{
                                        float: "right",
                                        align: "right",
                                    }}
                                    variant="success"
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
                                    variant="outline-warning"
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
                            </Tab>
                        ) )
                    }
                    </Tabs>
                    : (this.state.errorGetTrackerConfigs)
                        ? <Tabs 
                            id="controlled-1" 
                            activeKey={ this.state.tabValue } 
                        >
                            <Tab eventKey={ this.state.tabValue } title="err">
                                <div>{ this.state.errorMsgGetTrackerConfigs.toString() }</div>
                            </Tab>
                        </Tabs>
                        : <Tabs 
                            id="controlled-2" 
                            activeKey={ this.state.tabValue } 
                        >
                            <Tab eventKey={ this.state.tabValue } title="load">
                                <div>Loading..</div>
                            </Tab>
                        </Tabs>
                    
                }

			</div>
		);
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
                if(res && res.err){
                    console.log("users - gettingUsers err", res);
                    this.setState({
                        errorGetTrackerConfigs: true,
                        errorMsgGetTrackerConfigs: res.errMsg.toString()
                    });
                    return;
                }
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

    getPartnersList(){
        userAPIObj.getPartners()
        .then(
            result => {
                if(result && result.err){
                    console.log("trakerConfig - gettingUsers err", result);
                    return;
                }
                console.log("trakerConfig mount2 usersArr", result); // type: arr
                this.setState({allPartners: result.data }, function(){
                    rootStore.dispatch({
                        type: 'GET_SYSTEM_PARTNERS',
                        payload: {
                            partnerData: this.state.allPartners
                        }
                    });
                });
            }
        )
    }

    handleTabChange = ( selectedTab ) => {
        this.setState({ viewingTabTrackerId: selectedTab } );
    }

    /**
     * write columns config of single tracker to the DB
     */
    saveTrackerToDB( trackerId ){
        let trackerConfig = this.props.trackers.find( tr=> tr.tracker_id === trackerId);
        if(!trackerConfig){
            console.log("trackerConfig find err", trackerId);
            return;
        }

        trackersAPIobj.saveTrackerConfig( trackerConfig , trackerId)
        .then(
            res => {
                if(res && !res.err && res.data){
                    this.getTrackersConfig();
                }
                else{
                    console.log("trackerConfig save err", res);
                }
            }
        )

    }


}

const mapStateToProps = state => {
	console.log('trackerConfig.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        trackers: state.TrackConfigReducer.configData,

        //trackersHash: JSON.stringify(state.TrackConfigReducer.configData),
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(TrackersConfig));

