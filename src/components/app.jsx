
import React, { Component } from 'react';
import { Provider } from 'react-redux';

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
