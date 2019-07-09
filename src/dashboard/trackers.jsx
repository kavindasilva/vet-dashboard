
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

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

        tabValue:1,
        //trackers: trackersConfig,
    }
	//state = { Meta }

	componentDidMount(){
        this.loadTickets(0);
		console.log("Trackers - mount. props:", this.props); //ok
        //console.log("Trackers - mount. props.metaData:", this.props.metaData); 
        
        //this.getTrackersConfig();
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
                { this.viewTabs() }
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
                        value={this.state.tabValue}
                        onChange={ this.handleChange }
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="staticTab" /*onClick={ () => this.handleChange(null,1)}*/ />
                        
                        {
                            this.props.configData.map( tracker => (
                                <Tab key={ tracker.id } label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.props.configData.map( tracker => (

                        this.state.tabValue === tracker.id && 
                        <React.Fragment key={ tracker.id } >
                            <h3>Tracker Name: { tracker.name } </h3>
                            <p>Tracker ID: {tracker.id} </p>

                            <Paper style={ {} }>
					            <Table size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TrackerTableHeader trackerId={tracker.id}>
                                            </TrackerTableHeader>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TrackerTableRow 
                                            trackerId={tracker.id} 
                                            tracker={ tracker }
                                            trackerRecordId={null}>
                                        </TrackerTableRow>
                                    </TableBody>
                                </Table>
                            </Paper>

                        </React.Fragment>
                    ))
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
                console.log("trackers res:", res.data);
                //let m=Object.values(res.data);
                this.setState({ trackersConfigData: res.data }, function(){
                    this.dispatchTrackerConfigs();
                }); /* */
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
    
    loadTickets = ( ticketid ) => {
		console.log("trackers - loadTickets");
		let data = ticketAPIobj.callHubspot( 0,0 )
			.then(
				response => {
					console.log("trackers.jsx - Tresponse2: ", response);

					rootStore.dispatch({
						type: 'GET_HUBSPOT_TICKETS',
						payload: {
							ticketData: response.data.tickets
						}
					})

				}
			) /* */
	}

}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        
        /** all the tracker instances related data */
        instanceData: state.TrackInstaReducer.instanceData,
        
        /** all the trackers configuration related data */
		configData: state.TrackConfigReducer.configData,
	};
}

//export default Trackers;
//export default connect(mapStateToProps)(Trackers);
export default connect(mapStateToProps)(withStyles(styles)(Trackers));

