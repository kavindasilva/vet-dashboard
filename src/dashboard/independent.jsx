
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { petStore } from "../stores/pets";

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
import loginAPI from "../apicalls/loginAPI";

const useStyles = theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
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

class IndependentTracker extends React.Component{
    classes=this.props.classes;
    //tabValue=3;

	state = { ...this.props.metaData, otp:"qaauto", tabValue:2 }
	//state = { Meta }

	componentDidMount(){
		//console.log("IndependentTracker - mount. classes:", this.classes);
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
				{ this.viewTracker() }
			</React.Fragment>
		)
    }

	/** 
     * View Independent tracker
     */ 
	viewTracker(){
		return(
			<div>
				
			</div>
		);
	}


}

const mapStateToProps = state => {
	console.log('login.jsx-mapStateToProps', state);
	return {
		//metaData: state.metaData,
		metaData: state.MetaReducer.metaData,
	};
}

export default IndependentTracker;
//export default connect(mapStateToProps)(withStyles(useStyles)(IndependentTracker));
//export default connect(mapStateToProps)(withStyles(useStyles)(IndependentTracker));

