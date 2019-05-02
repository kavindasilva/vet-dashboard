

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Pet from '../components/pet';
// import { petStore } from "../stores/pets";

 // import PetReducer from '../reducers/pets'
import { connect } from "react-redux";
import { Provider } from 'react-redux'
import { viewPet, updatePet, viewNewPet } from '../actions/index'


import petAPI from "../apicalls/petAPI";
const petAPIobj = new petAPI();
//console.log(petAPIobj);

//import Clock from '../components/clock';

class Pets extends Component {

	state = { ...this.props.stateInfo };
	
	styles1 = {
		fontSize:18,
		fontWeight: "bold"
	};

	constructor(props){
		super(props);
	}

	componentDidMount(){
		//PetReducer( this.stateData, viewPet );
		//console.log(store);
		//this.setState({ petAdmission: this.props.stateInfo.petAdmission })

	}

	/**/componentDidMount0(){ // working
		console.log("Pets - Mount");
		let data = petAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					//console.log("A");
					this.setState({ petAdmission: response.data })
				}
				return response;
			})
	
		//console.log(data);
		//let data = this.callApi0(); console.log("data", data);

	}/**/

	render() {
		//data
		//let varClass="btn btn-sm btn-";
		return (
			<div>
				{ /*<Clock />
				{ /* passes petAdmission data to the pet object */ }
				<table border="1">
					<thead><tr>
						<th>ID</th>
						<th>Name</th>
						<th>Speci</th>
						<th>Gender</th>
						<th>Age</th>
						<th>Symptoms</th>
						<th>Admitted Date</th>
					</tr></thead>
					<tbody>
						{ this.viewAll() }
					</tbody>
				</table>
			</div>
		) ;

	}

	viewAll(){
		return (
			//this.state.petAdmission.map( pet => 
			// PetReducer( this.stateData, 0).admissions.map( pet => 
			this.state.admissions.map( pet =>
				<Pet key={pet.id} 
				  petRecord = {pet}
				> 
				</Pet>
			 )
		);

		//this.state.petAdmission.map( pet => <Pet key={pet.id}  /> ) 
	}


	callApi0(){
		// Github fetch library : https://github.com/github/fetch
		// Call the API page
		fetch('http://127.0.0.1/ucsc5/vet-dashboard/phpApi/getData.php')
			.then((result) => {
				// Get the result
				// If we want text, call result.text()
				return result.json();
			})
			.then((jsonResult) => {
				// Do something with the result
				//console.log(jsonResult);
				this.setState({ petAdmission: jsonResult });
				return jsonResult;
			})
	}

	retriveFromPet = (property, value)=>{
		switch(property){
			case "0":
				console.log(""); break;
		}
	}


	handleGender = ( petID, value) =>{
		//console.log("pets handleGender", petID);
		//console.log(prop);
		console.log(value);
		//let newPets= this.state.petAdmission.filter( p => p.id !==  petID ); // delete
		//let newPets= this.state.petAdmission.filter( p => p.id !==  petID );
		//this.setState( { petAdmission : newPets } );

		this.setState({
		  data: this.state.petAdmission.map(el => (el.id === petID ? {...el, value} : el))
		});

		/*var update = require('immutability-helper');
		var commentIndex = this.state.petAdmission.findIndex(function(c) { 
        	return c.id == petID; 
    	});
    	var updatedComment = update(this.state.petAdmission[commentIndex], {gender: {$set: value}}); 
	    var newData = update(this.state.petAdmission, {
	        $splice: [[commentIndex, 1, updatedComment]]
	    });
	    this.setState({petAdmission: newData});*/

		//this.setState( {  } );
	}

}

export default Pets;
