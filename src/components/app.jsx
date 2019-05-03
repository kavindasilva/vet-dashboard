
import React, { Component } from 'react';
import { petStore } from "../stores/pets";
import Pets from "../components/pets";
import { Provider } from 'react-redux';

class App extends Component {
	render() {
		//console.log('app.jsx-rendering. petStore: ', petStore.getState() );
		return (
            <Provider store={ petStore } >
                <Pets/>
            </Provider>
		);
	}
}

export default App;