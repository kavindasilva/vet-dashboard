
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

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
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Menu from "../common/menu";

import trackersConfig from "../config-data/trackersConfig";
import trackerInstances from "../config-data/trackerInstance";



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

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
        Test Para
      </Typography>
    );
}

class TrackersConfig extends React.Component{
    classes=this.props.classes;
    //tabValue=3;

	state = { 
        ...this.props.metaData, 

        tabValue:2,
        trackers: trackersConfig,
    }
	//state = { Meta }

	componentDidMount(){
		console.log("TrackersConfig - mount. json:", this.state.trackers); //ok
		console.log("TrackersConfig - mount. props.metaData:", this.props.metaData); 
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
                            this.state.trackers.map( tracker => (
                                <Tab label={ tracker.name } />
                            ))
                        }
                    </Tabs>
                </AppBar>

                {
                    this.state.trackers.map( tracker => (
                        this.state.tabValue === tracker.id && 
                        <React.Fragment>
                            <h3> { tracker.name } </h3>
                            <p>X {tracker.id} </p>
                            <table>
                                <thead>
                                    <TrackerTableHeader trackerId={tracker.id}>
                                    </TrackerTableHeader>
                                </thead>
                                <tbody>
                                    <TrackerTableBody trackerId={tracker.id}>
                                        <TrackerTableRow trackerId={tracker.id} trackerRecordId={null}>
                                        </TrackerTableRow>
                                    </TrackerTableBody>
                                </tbody>
                            </table>
                            {
                                this.showColumns(tracker)
                            }
                        </React.Fragment>
                    ))
                }

			</div>
		);
    }
    
    /** 
     * Show the columns based on user permissions after calling printColumn()
     * This function is called by viewTabs()
     * */
    showColumns( trackerInfo ){
        let usersVisibleColumns=[];
        return( 
            trackerInfo.columns.map( column => (
                console.log("col:", column),
                usersVisibleColumns=[],
                //console.log("test")

                usersVisibleColumns=(column.permissions.find( (userPermission, i, arr) => 
                    userPermission.id==this.props.metaData.userId,
                    
                )),
                //usersVisibleColumns.push(column),

                console.log("showCols currentCols", usersVisibleColumns),
                this.printColumn(column, usersVisibleColumns, trackerInfo.id)

            ) ) 
        );

    }

    /**
     * Print the columns where user is authorized
     */
    printColumn = (columnData, userPermission, trackerToGet) => {
        //console.log("trackers printCol: colData",columnData, "\npermission:", userPermission);
        //console.log("trackers id:", trackerToGet);

        /** column: colId, id(user),  read, write, type  */
        let column = this.objectMerge(columnData,userPermission);
        console.log("trackers printCol: merged", column);

        return(
            trackerInstances.map( tracker =>{
                //console.log("trackersConfig tracker:", tracker)
                if( tracker.id == trackerToGet )
                    return(
                        tracker.data.column
                    )
            } )
        )

        //return this.printCheckBox()  
    }

    printCheckBox(){
        return(
            <Button>sample</Button>
        );
    }

    /**
     * Merges two arrays, and return new array
     * source: https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
     */
    objectMerge(obj, src) {
	    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
	    return obj;
	}

}

const mapStateToProps = state => {
	console.log('trackers.jsx-mapStateToProps', state);
	return {
		//metaData: state.metaData,
		metaData: state.MetaReducer.metaData,
	};
}

//export default TrackersConfig;
export default connect(mapStateToProps)(TrackersConfig);
//export default connect(mapStateToProps)(withStyles(useStyles)(TrackersConfig));

