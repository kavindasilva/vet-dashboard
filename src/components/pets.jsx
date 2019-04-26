
/**
	Details about all pets
*/

import React, { Component } from 'react';
import Pet from '../components/pet';

//import petAPI from "../apicalls/petAPI";
//const petAPIobj = new petAPI();


//import Clock from '../components/clock';

class Pets extends Component {
	state = {
		title: "Pets Details",

		petAdmission: [],
		/**petAdmission: [ 
			{ id:0 , name:"Rover" , speci:"Dog" , gender:"Male" , years:3.5 , symptoms:["Fever", "Cold"] , admittedDate:"2019-04-01" },
			{ id:1 , name:"King" , speci:"Cat" , gender:"Female" , years:1.2 , symptoms:["Bleeding"] , admittedDate:"2019-04-02" },
			{ id:2 , name:"Kitty" , speci:"Cat" , gender:"Male" , years:3 , symptoms:["Swating" , "RefusingFood"] , admittedDate:"2019-04-02" },
			{ id:3 , name:"Peter" , speci:"Bird" , gender:"Male" , years:1 , symptoms:["Sleeping"] , admittedDate:"2019-04-03" },
			{ id:4 , name:"Tommy" , speci:"Dog" , gender:"Female" , years:2 , symptoms:["Cold"] , admittedDate:"2019-04-03" },

		],/**/
	}

	styles1 = {
		fontSize:18,
		fontWeight: "bold"
	};

	/**/
	constructor(){
		super();
		//this.eventHandle2 = this.eventHandle2.bind(this);
	}
	/**/

	/**/componentDidMount(){
		console.log("Pets - Mount");
		//this.callApi();
		let data = this.callApi0(); console.log("data", data);

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
			this.state.petAdmission.map( pet => 
				<Pet key={pet.id} 
				  petRecord = {pet}

					updateGender={ this.handleGender /*pass by reference*/ }
					sendToPets={ this.retriveFromPet }
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
