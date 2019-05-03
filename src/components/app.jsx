
import React, { Component } from 'react';
import { petStore } from "../stores/pets";
import Pets from "../components/pets";
import { Provider } from 'react-redux';

class App extends Component {
	state = {}

	render() {
		console.log('app.jsx-rendering');
		return (
            <Provider store={ petStore } >
                <Pets stateInfo={ petStore.getState() } />
            </Provider>
		);
	}
}

export default App;