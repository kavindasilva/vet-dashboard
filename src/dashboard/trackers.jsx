//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import AppBar from '@material-ui/core/AppBar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TDBSync from "../config/tdbSync"
import SyncAltIcon from '@material-ui/icons/Repeat';
import { red } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ticketAPI from "../apicalls/ticketAPI";
import trackersAPI from "../apicalls/trackersAPI";

import TicketSearch from "../dashboard/ticketSearch"

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Snackbar } from '@material-ui/core';
import Button from 'react-bootstrap/Button'
import moment from "moment";
import ReactLoading from 'react-loading';
import CellSizeAdjuster from "../dashboard/cellSizeAdjuster"

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
        colWidth: 50,
        colHeight: 50,
        
        isLoadingTickets: true,
        isLoadingConfigs: true,

        ...this.props.metaData, 
        last_updated: [], // get by tracker_id
        last_synced: null,

        tabValue:0,
        viewingTabTrackerId: 3,
        showNewClinicAddForm: false,

        errorGetTrackers: false,
        errorMsgGetTrackers: false,

        selectedTrackerToDownload: 1,

        showNotification: false,
        notificationMsg: "kijsdab",
    }

	componentDidMount(){
		console.log("Trackers - mount. props:", this.props); //ok
        //console.log("Trackers - mount. props.metaData:", this.props.metaData); 
        
        this.setLastUpdatedTime(this.state.viewingTabTrackerId);
        //this.setLastUpdatedTime()
        this.setState({selectedTrackerToDownload: this.state.viewingTabTrackerId });

        this.getTrackersConfig();
        this.getTicketData();
        this.getPipelineData();
        //this.setLastSyncedTime(this.state.viewingTabTrackerId);
	}

	render(){
		return(
			<div align={"right"} style={{ padding: "10px 0px 0px 0px"}} >
                <div>
                    {/* <CellSizeAdjuster /> */}
                    <Button
                        variant="secondary"
                        style={{textTransform: "none"}}
                        onClick={ ()=> this.setState({showNewClinicAddForm: true}) }
                    >
                        <AddCircleOutlineIcon style={{ paddingRight:"6px" }} />
                        <span>New Clinic</span>
                    </Button>
                </div>
                { 
                    (this.state.isLoadingTickets || this.state.isLoadingConfigs)
				    ? <center><ReactLoading type={"bars"} color={"green"} height={20} width={22} /></center>
                    : this.viewTabs()
                }
                {
                    this.viewSnackBar()
                }
                {
                    this.handleNewClinicAddForm()
                }
                
			</div>
		)
    }
    
    /**
     * selectedTab: <tracker_id>
     */
    handleTabChange = ( selectedTab ) => {
        //this.setState({tabValue: selectedTab});
        this.setState({ viewingTabTrackerId: selectedTab, selectedTrackerToDownload: selectedTab }, ()=>{
            this.setLastUpdatedTime(selectedTab)
        } );
        //this.setLastUpdatedTime(tracker.tracker_id);
    }


	/** 
     * View Tabs layout of trackers
     * Display columns : all
     */
	viewTabs(){
		return(
			<div>
                {/* <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                    <Tab eventKey="home" title="Home">
                        <Sonnet />
                    </Tab>
                </Tabs> */}


                {
                    (this.props.configData && !this.state.errorGetTrackers)?
                        <Tabs 
                            id="controlled-tab-example" 
                            activeKey={ this.state.viewingTabTrackerId } 
                            onSelect={ this.handleTabChange }
                        >
                        {
                            this.props.configData.map( (tracker, trackerIndex) => (
                                <Tab 
                                    key={ trackerIndex } 
                                    eventKey={ tracker.tracker_id } 
                                    title={ tracker.name } 
                                >
                                    <div 
                                        key={ tracker.tracker_id } 
                                    >
                                        <div float={'right'} align={'right'} style={{padding:"10px 10px 0px 0px"}} >
                                            
                                            <TDBSync
                                                viewingTabTrackerId={ this.state.viewingTabTrackerId }
                                            />

                                            <div style={{padding: "2px 0px 0px 0px"}}>
                                                <span>Last Refresh: { (this.state.last_updated[tracker.tracker_id])? (this.state.last_updated[tracker.tracker_id]): "N/A" } </span>
                                                <Tooltip title="Refresh">
                                                    <Button
                                                        variant="outline-info"
                                                        onClick={ ()=> {
                                                            this.getTrackersConfig();
                                                            this.getTicketData();
                                                            this.setLastUpdatedTime(this.state.viewingTabTrackerId);
                                                            this.setState({
                                                                selectedTrackerToDownload: this.state.viewingTabTrackerId,
                                                                isLoadingConfigs: true,
                                                                isLoadingTrackers: true,
                                                            })
                                                        }}
                                                        size="sm"
                                                        style={ {width: "20px", height: "20px", padding: "0px 0px 0px 0px"} }
                                                    >
                                                        <RefreshIcon 
                                                            fontSize="small"
                                                            style={ {width: "20px", height: "20px"} } 
                                                        />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
            
                                        <div float={'right'} align={'right'}>
                                            <TicketSearch
                                                tracker_id={ this.state.selectedTrackerToDownload }
                                                getAllTickets={this.getTicketData}
                                                dispatchTickets={this.dispatchTicketInstances}
                                            /><br/>
                                        </div>
                                                
                                        <div 
                                            float={'right'} align={'left'}
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
                                                    trackerRecordId={null}
                                                >
                                                </TrackerTableRow>
                                            </StickyTable>
                                        </div>
            
                                    </div>
                                </Tab>
                            ))
                        }
                        </Tabs>
                    :(this.state.errorGetTrackers)
                        ? <Tabs 
                            id="controlled-1" 
                            activeKey={ this.state.tabValue } 
                            // onSelect={()=> {
                            //     this.setLastUpdatedTime(tracker.tracker_id);
                            //     this.setState({selectedTrackerToDownload: tracker.tracker_id, viewingTabTrackerId: tracker.tracker_id })
                            // }}
                        >
                            <Tab eventKey={ this.state.tabValue } title="err">
                                <div>{ this.state.errorMsgGetTrackers.toString() }</div>
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

    viewSnackBar = () => (
        <Snackbar
            open={ this.state.showNotification }
            aria-describedby="client-snackbar"
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'top'
            }}
            message={ 
                <span style={{color:"red", backgroundColor: "blue"}}>
                    { this.state.notificationMsg }
                </span>
            }
            action={[
                <IconButton 
                    key="close" 
                    aria-label="close" 
                    color="inherit" 
                    onClick={ ()=>this.setState({showNotification: false}) }
                >
                    x
                </IconButton>,
            ]}
            
        />
    )

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
                maxWidth="lg"
                fullWidth={ true }
            >
                <DialogTitle>
                    Add new Clinic
                </DialogTitle>

                <DialogContent>
                    <iframe 
                        src={"https://share.hsforms.com/1IPCBgBVWScO77b_XOmVMlQ3j8em" /* may be need to import from constants */}
                        height={ "600px" }
                        width={ "100%" }
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
                }
            }
        ) 
    }

    

    /**
     * retrieve trackers configuration data from DB
     */
    getTrackersConfig(){
        // this.setState({isLoadingConfigs: true});
        trackersAPIobj.getTrackerConfig()
        .then(
            res => {
                console.log("trackers config res:", res.data);
                //let m=Object.values(res.data);
                this.setState({ trackersConfigData: res.data }, function(){
                    this.dispatchTrackerConfigs();
                    this.setState({isLoadingConfigs: false});
                });
            }
        )
    }

    /**
     * retrieve tracker instances data from DB
     */
    getTicketData = () => {
        // this.setState({isLoadingTrackers: true});
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
                    this.setState({isLoadingTickets: false});
                    return;
                }

                this.setState({ ticketsData: res.data }, function(){
                    this.dispatchTicketInstances();
                });

                //console.log("trackers getTicketData headers: ", res.headers["last-updated"]);
                if(res.headers &&  res.headers["last-updated"]){
                    this.setState({last_updated: res.headers["last-updated"]});
                }
                this.setState({isLoadingTickets: false});
            }
        )
    }

    getPipelineData = () => {
        this.setState({isLoadingConfigs: true});
        trackersAPIobj.getAvailablePipelines()
        .then(
            res => {
                console.log("pipes config res:", res.data);
                this.setState({ pipelines: res.data }, function(){
                    this.dispatchPipelineData();
                    this.setState({isLoadingConfigs: false});
                });
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

    dispatchPipelineData = () => {
		rootStore.dispatch({
			type: 'LOAD_PIPELINE_DATA_FROM_DB',
			payload: {
				pipesData: this.state.pipelines
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

