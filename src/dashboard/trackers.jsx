//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';



import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Menu from "../common/menu";
import Icon from '@material-ui/core/Icon';
import { red } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';

import ticketAPI from "../apicalls/ticketAPI";
import trackersAPI from "../apicalls/trackersAPI";

import TicketSearch from "../dashboard/ticketSearch"

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';

import moment from "moment";

const ticketAPIobj = new ticketAPI();
const trackersAPIobj = new trackersAPI();

const styles = theme => ({
	root: {
	  width: "100%",
	  marginTop: theme.spacing.unit * 3,
	  overflowX: "auto"
	},
	head: {
	  backgroundColor: "#eee",
	  position: "sticky",
	  top: 0
    },
    iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
          color: red[800],
        },
    }
});

class Trackers extends React.Component{
	state = { 
        ...this.props.metaData, 
        last_updated: [], // get by tracker_id
        tabValue:2,
        viewingTabTrackerId: 3,
        showNewClinicAddForm: false,

        errorGetTrackers: false,
        errorMsgGetTrackers: false,

        selectedTrackerToDownload: 1,
    }

	componentDidMount(){
		console.log("Trackers - mount. props:", this.props); //ok
        //console.log("Trackers - mount. props.metaData:", this.props.metaData); 
        
        this.getTrackersConfig();
        this.getTicketData();
        this.setLastUpdatedTime()
	}

	render(){
		return(
			<React.Fragment>
                <Button
                    onClick={ ()=> this.setState({showNewClinicAddForm: true}) }
                >
                    NewCilinc
                </Button>
                {/* <Tooltip title="Refresh">
                    <IconButton
                        onClick={ ()=>this.componentDidMount() } size="small"
                    >
                        <RefreshIcon color="primary" s />
                    </IconButton>
                </Tooltip> */}
                { 
                    this.viewTabs()
                }
                {
                    this.handleNewClinicAddForm()
                }
                
			</React.Fragment>
		)
    }
    
    handleChange = (event, newValue) => {
        this.setState({tabValue: newValue});
    }

	/** 
     * View Tabs layout of trackers
     * Display columns : all
     */
	viewTabs(){
		return(
			<div>
				<AppBar position="static" color="default">
                    <Tabs
                        key={this.state.tabValue}
                        value={this.state.tabValue}
                        onChange={ this.handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >                        
                        {
                            (this.props.configData && !this.state.errorGetTrackers)?
                            this.props.configData.map( tracker => (
                                <Tab 
                                    key={ tracker.tracker_id } 
                                    label={ tracker.name } 
                                    onClick={ ()=> {
                                        this.setLastUpdatedTime(tracker.tracker_id);
                                        this.setState({selectedTrackerToDownload: tracker.tracker_id, viewingTabTrackerId: tracker.tracker_id })
                                        //this.setState({lastSynced: moment().format('MM/DD/YYYY, HH:mm:ss')})
                                    }}
                                />
                            ))
                            :(this.state.errorGetTrackers)
                                ? <Tab 
                                    key={ 1001 } 
                                    label={ Error } 
                                />
                                :<Tab 
                                    key={ 1002 } 
                                    label={ "Trackers Loading..." } 
                                />
                        }
                    </Tabs>
                </AppBar>

                {
                    (this.props.configData && !this.state.errorGetTrackers)?
                    this.props.configData.map( tracker => (

                        (this.state.tabValue+1) === tracker.tracker_id && 
                        <div 
                            key={ tracker.tracker_id } 
                        >
                            <div float={'right'} align={'right'}>
                                <span>Last Sync at: { "N/Implemented" }
                                    
                                </span><br/>
                                <span>Last Refresh: { (this.state.last_updated[tracker.tracker_id])? (this.state.last_updated[tracker.tracker_id]): "N/A" }
                                    <Tooltip title="Refresh">
                                        <IconButton
                                            onClick={ ()=>this.componentDidMount() } 
                                            size="small"
                                            style={ {width: "20px", height: "20px"} }
                                        >
                                            <RefreshIcon color="primary" style={ {width: "20px", height: "20px"} } />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            </div>

                            <div float={'right'} align={'right'}>
                                <TicketSearch
                                    tracker_id={ this.state.selectedTrackerToDownload }
                                    getAllTickets={this.getTicketData}
                                    dispatchTickets={this.dispatchTicketInstances}
                                /><br/>
                            </div>
                            
                            
                            <h3>Tracker Name: { tracker.name } </h3>
                            <small>Tracker ID: {tracker.tracker_id} </small>
                            <small> | Pipeline: {tracker.pipeline_label} </small>

                            <div 
                                //style={{width: '100%', height: '120%'}}
                                style={{width: '100%', height: '600px'}}
                            >
                                <StickyTable 
                                    stickyHeaderCount={1}
                                    stickyColumnCount={1}
                                >
                                    <Row>
                                        <TrackerTableHeader tracker_id={tracker.tracker_id} key={tracker.tracker_id}>
                                        </TrackerTableHeader>
                                    </Row>
                                    <TrackerTableRow 
                                        tracker_id={tracker.tracker_id} 
                                        tracker={ tracker }
                                        trackerRecordId={null}
                                    >
                                    </TrackerTableRow>
                                </StickyTable>
                            </div>

                        </div>
                    ))
                    :(this.state.errorGetTrackers)
                        ? <div>
                            { this.state.errorMsgGetTrackers.toString() }
                        </div>
                        :<div> 
                            Loading...
                        </div>
                }

			</div>
		);
    }

    /**
	 * shows the new New clinic adding form in a popup dialog
	 */
	handleNewClinicAddForm(){
        return(
            <Dialog
                open={this.state.showNewClinicAddForm}
                onClose={this.closeNewClinicForm}
                aria-labelledby="draggable-dialog-title"
                height={ "600px" }
                width={ "800px" }
                minWidth={ "600px" }
            >
                <DialogTitle>
                    Add new VG
                </DialogTitle>

                <DialogContent>
                    <iframe 
                        src={"https://share.hsforms.com/1IPCBgBVWScO77b_XOmVMlQ3j8em" /* may be need to import from constants */}
                        height={ "600px" }
                        width={ "1000px" }
                    >
                        Loading "https://share.hsforms.com/1IPCBgBVWScO77b_XOmVMlQ3j8em"
                    </iframe>
                </DialogContent>

                <DialogActions>
                    <Button onClick={ ()=>{
                            //this.setState({ attributeValue: this.props.value });
                            this.closeNewClinicForm() 
                        } }
                        //style={ this.styleMatUI.closeButton }	
                        variant="text"
                        color="primary"
                    >
                        Close
                    </Button>
                    
                </DialogActions>
            </Dialog>
        );
    }

	closeNewClinicForm = () => {
		this.setState({showNewClinicAddForm: false});
	}

    setLastUpdatedTime = (trackerId) => {
        trackersAPIobj.getTrackerLastUpdated(trackerId)
        .then(
            res => {
                if(res.headers &&  res.headers["last-updated"]){
                    let newLastUpdated = {...this.state.last_updated} ;

                    newLastUpdated[trackerId] = res.headers["last-updated"];
                    this.setState({ last_updated: newLastUpdated });

                    this.setState({lastSynced: moment().format('YYYY-MM-DD HH:mm:ss')})

                }
                else if(res.data)
                    this.setState({lastSynced: moment().format('YYYY-MM-DD HH:mm:ss')})

            }
        )

        
    }

    /**
     * retrieve trackers configuration data from DB
     */
    getTrackersConfig(){
        trackersAPIobj.getTrackerConfig()
        .then(
            res => {
                console.log("trackers config res:", res.data);
                //let m=Object.values(res.data);
                this.setState({ trackersConfigData: res.data }, function(){
                    this.dispatchTrackerConfigs();
                });
            }
        )
    }

    /**
     * retrieve tracker instances data from DB
     */
    getTicketData = () => {
        ticketAPIobj.getTicketsAndProperties()
        .then(
            res => {
                console.log("trackers insta res:", res.data);
                if(res && res.err){
                    console.log("users - gettingUsers err", res);
                    this.setState({
                        errorGetTrackers: true,
                        errorMsgGetTrackers: res.errMsg.toString()
                    });
                    return;
                }

                this.setState({ ticketsData: res.data }, function(){
                    this.dispatchTicketInstances();
                });

                //console.log("trackers getTicketData headers: ", res.headers["last-updated"]);
                if(res.headers &&  res.headers["last-updated"]){
                    this.setState({last_updated: res.headers["last-updated"]});
                }
            }
        )
    }
    

    /**
     * Merges two arrays, and return new array.
     * source: https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
     */
    objectMerge(obj, src) {
	    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
	    return obj;
    }
    
    dispatchTrackerConfigs = () => {
		rootStore.dispatch({
			type: 'GET_CONFIG_FROM_DB',
			payload: {
				data: this.state.trackersConfigData
			}
		});
    }

    dispatchTicketInstances = () => {
		rootStore.dispatch({
			type: 'GET_TICKETS_FROM_DB',
			payload: {
				data: this.state.ticketsData
			}
		});
    }

}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        
        /** all the tracker instances related data */
        ticketsData: state.ticketsDataReducer.ticketsData,
        
        /** all the trackers configuration related data */
		configData: state.TrackConfigReducer.configData,
	};
}


export default connect(mapStateToProps)(withStyles(styles)(Trackers));

