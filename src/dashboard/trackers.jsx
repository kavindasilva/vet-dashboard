
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

const loginAPIobj = new loginAPI();



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

class Trackers extends React.Component{
    classes=this.props.classes;
    //tabValue=3;

	state = { ...this.props.metaData, otp:"qaauto", tabValue:2 }
	//state = { Meta }

	componentDidMount(){
		//console.log("Trackers - mount. classes:", this.classes);
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
                        <Tab label="Independent" /*onClick={ () => this.handleChange(null,1)}*/ />
                        <Tab label="IVC1" />
                        <Tab label="IVC2" />
                        <Tab label="Tracker Four" />
                        <Tab label="Tracker Five" />
                        <Tab label="Tracker Six" />
                        <Tab label="Tracker Seven" />
                    </Tabs>
                </AppBar>

                { this.state.tabValue === 0 && <TabContainer>Independent</TabContainer> }
                { this.state.tabValue === 1 && <TabContainer> IVC V1<Menu /> </TabContainer> }
                { this.state.tabValue === 2 && <TabContainer> IVC V2 </TabContainer> }
                { this.state.tabValue === 3 && <TabContainer>Tracker Four</TabContainer> }
                { this.state.tabValue === 4 && <TabContainer>Tracker Five</TabContainer> }
                { this.state.tabValue === 5 && <TabContainer>Tracker Six</TabContainer> }
                { this.state.tabValue === 6 && <TabContainer>Tracker Seven</TabContainer> }
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

export default Trackers;
//export default connect(mapStateToProps)(withStyles(useStyles)(Trackers));
//export default connect(mapStateToProps)(withStyles(useStyles)(Trackers));

