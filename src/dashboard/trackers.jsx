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

import ticketAPI from "../apicalls/ticketAPI";
import trackersAPI from "../apicalls/trackersAPI";

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

//import StaticFixedTable from "../dashboard/staticFixedTable"

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
	}
});

class Trackers extends React.Component{
	state = { 
        ...this.props.metaData, 
        tabValue:0,

        errorGetTrackers: false,
        errorMsgGetTrackers: false,
    }

	componentDidMount(){
		console.log("Trackers - mount. props:", this.props); //ok
        //console.log("Trackers - mount. props.metaData:", this.props.metaData); 
        
        this.getTrackersConfig();
        this.getTicketData();
	}

	render(){
		return(
			<React.Fragment>
                { 
                    this.viewTabs() 
                }
                
			</React.Fragment>
		)
    }
    
    handleChange = (event, newValue) => {
        //this.tabValue=2;
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
                            <h3>Tracker Name: { tracker.name } </h3>
                            <small>Tracker ID: {tracker.tracker_id} </small>
                            <small> | Pipeline: {tracker.pipeline_label} </small>

                            <div 
                                style={{width: '100%', height: '100%'}}
                                //style={{width: '100%', height: '200px'}}
                            >
                                <StickyTable 
                                    stickyHeaderCount={1}
                                    stickyColumnCount={1}
                                >
                                    <Row>
                                        <TrackerTableHeader trackerId={tracker.tracker_id} key={tracker.tracker_id}>
                                        </TrackerTableHeader>
                                    </Row>
                                    <TrackerTableRow 
                                        trackerId={tracker.tracker_id} 
                                        tracker={ tracker }
                                        trackerRecordId={null}>
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
    getTicketData(){
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

