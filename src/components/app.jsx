
import React, { Component } from 'react';
import Pets from "../components/pets";
import { Provider } from 'react-redux';

import Radio from '@material-ui/core/Radio';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup, Button } from "@material-ui/core";


import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import Login from "../common/login";

import { rootStore } from "../stores/mainStore";

class App extends Component {
	state={}
	render() {
		//console.log('app.jsx-rendering. rootStore: ', rootStore.getState() );
		return (
			<Provider store={ rootStore } >
				<Login />
			</Provider>
		);
	}

	componentDidMount(){ 
		//this.loadInitialData();
	}

	

}

export default App;
//export default withStyles(styles)(App);
