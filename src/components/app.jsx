
import React, { Component } from 'react';
import Pets from "../components/pets";
import { Provider } from 'react-redux';

import { petStore } from "../stores/pets";
//import { createStore } from "redux";
//import PetReducer from "../reducers/pets";

import petAPI from "../apicalls/petAPI";
const petAPIobj = new petAPI();



//const petStore = createStore(PetReducer, {admissions:[ { id:'0' , name:"RoverStt" , speci:"Dog" , gender:"Male" , years:"3.5" , symptoms:["Fever", "Cold"] , admittedDate:"2019-04-01" } ]} );
//const petStore = createStore(PetReducer ,

class App extends Component {
	render() {
		//console.log('app.jsx-rendering. petStore: ', petStore.getState() );
		return (
            //<Provider store={ petStore } >
            <Provider store={ petStore } >
                <Pets/>
            </Provider>
		);
	}

	componentDidMount(){ // working
		console.log("App - Mount");
		let data = petAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					//console.log("A");
					this.setState({ petAdmission: response.data })
					
				}
				return response;
			})
			.then(
				response => {
					petStore.dispatch({
						type: 'GET_FROM_API',
						payload: {
							apiData: response.data
						}
					})
				}
			)

		/*petStore.dispatch({
			type: 'GET_FROM_API',
			payload: {
				apiData: data
			}
		})*/

		//console.log(data);
		//let data = this.callApi0(); console.log("data", data);
	}
}

export default App;