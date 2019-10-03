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

import GridCol from "react-bootstrap/Col"
import GridRow from "react-bootstrap/Row"
import NewColumn from "../config/newColumn"
import NewRule from "../config/newRule"
import TrackersConfigColumns from "../config/trackersConfigColumns"

import { trackerColumnDataTypes, globalUrls } from "../common/constants"

import trackersAPI from "../apicalls/trackersAPI";
import { Table, TableHead, TableCell, TableBody, TableRow, MenuItem, Select, Collapse, Tooltip } from '@material-ui/core';

import ArrowRight from "@material-ui/icons/ArrowRight"
import ArrowDown from "@material-ui/icons/ArrowDropDown"
import RefreshIcon from "@material-ui/icons/Refresh"
import Container from 'react-bootstrap/Container';


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
class SuperAdmin extends React.Component{
    classes=this.props.classes;
	state = { 
        hsAuthButtonColor: { backgroundColor:"red"}
    }

	componentDidMount(){
		//console.log("SuperAdmin - mount. json:", this.state.trackers); 
        //console.log("SuperAdmin - mount. props.metaData:", this.props.metaData); 
        this.checkHSAuthStatus();
    }

	render(){
        if(this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3)
            return(
                <React.Fragment>You are not auth to view this page</React.Fragment>
            )
        else
            return this.makeComponents();
    }

    makeComponents(){
        return(
            <React.Fragment>
                <div align={"center"} style={{ padding: "10px 0px 0px 0px"}} >
                    <GridRow>
                        <GridCol sm={6} md={6} lg={6} xs={6} >
                            <Tooltip title="Authorize Hubspot">
                                <a target="_blank" href={ globalUrls.hs_auth } >
                                    <Button
                                        style={this.state.hsAuthButtonColor} 
                                        onClick={ ()=>this.checkHSAuthStatus() }
                                    >
                                        Authorize Hubspot
                                    </Button>
                                </a>
                            </Tooltip>
                        </GridCol>

                        <GridCol sm={6} md={6} lg={6} xs={6}>
                            <span>
                                Last Sync at: { (this.state.last_synced)? this.state.last_synced: "N/A" }
                            </span><br/>
                            <Tooltip title="Refresh">
                                <Button
                                    variant="outline-info"
                                    onClick={ ()=> {
                                        this.setLastSyncedTime(this.state.viewingTabTrackerId);
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
                        </GridCol>
                    </GridRow>

                    <GridRow>
                        <GridCol sm={6} md={6} lg={6} xs={6} >
                            <Tooltip title="Get Pipelines">
                                <a target="_blank" href={globalUrls.hs_auth} >
                                    <Button
                                        style={this.state.hsAuthButtonColor} 
                                        onClick={ ()=>this.checkHSAuthStatus() }
                                    >
                                        Load Pipelines
                                    </Button>
                                </a>
                            </Tooltip>
                        </GridCol>

                        <GridCol sm={6} md={6} lg={6} xs={6}>
                            <span>
                                Last Sync at: { (this.state.last_synced)? this.state.last_synced: "N/A" }
                            </span><br/>
                            <Tooltip title="Refresh">
                                <Button
                                    variant="outline-info"
                                    onClick={ ()=> {
                                        this.setLastSyncedTime(this.state.viewingTabTrackerId);
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
                        </GridCol>
                    </GridRow>

                </div>
            </React.Fragment>
        )
    }

    checkHSAuthStatus = () => {
        trackersAPIobj.checkHSAuthStatus()
        .then(
            res => {
                if(res && res.data){
                    if(res.data.is_hs_authorized)
                        this.setState({hsAuthButtonColor: { backgroundColor:"green"} })
                    else
                        this.setState({hsAuthButtonColor: { backgroundColor:"red"} })
                }
                else
                    this.setState({hsAuthButtonColor: { backgroundColor:"orange"} })
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

export default connect(mapStateToProps)(withStyles(useStyles)(SuperAdmin));

