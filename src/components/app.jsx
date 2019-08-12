import {APP_MODE} from "../common/constants"
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Login from "../common/login";

import { rootStore } from "../stores/mainStore";

class App extends Component {
	state={}
	render() {
		//if(APP_MODE==="DEBUG")console.log('app.jsx-rendering. rootStore: ', rootStore.getState() );
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
