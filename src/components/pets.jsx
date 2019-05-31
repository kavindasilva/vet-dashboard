

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Pet from '../components/pet';
// import { petStore } from "../stores/pets";

 // import PetReducer from '../reducers/pets'
import { connect } from "react-redux";
//import { Provider } from 'react-redux'
//import { viewPet, updatePet, viewNewPet } from '../actions/index'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import petAPI from "../apicalls/petAPI";
const petAPIobj = new petAPI();
//console.log(petAPIobj);

//import Clock from '../components/clock';

class Pets extends Component {

	state = {};
	
	styles1 = {
		fontSize:18,
		fontWeight: "bold"
	};

	styleMatUI ={
		table:{
			width: '100%',
			//marginTop: theme.spacing.unit * 3,
			overflowX: 'auto',
		}
	}

	/*constructor(props){
		super(props);
	}*/

	

	componentDidMount(){
		console.log("Pets didMount - props", this.props);
		//PetReducer( this.stateData, viewPet );
		//console.log(store);
		//this.setState({ petAdmission: this.props.stateInfo.petAdmission })

	}

	/**/componentDidMount0(){ // working
		console.log("Pets - Mount");
		//let data = petAPIobj.callApi()
		petAPIobj.callApi()
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

	render(){ //with materialUI
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>Obj_id</TableCell>
								<TableCell>Portal_id</TableCell>

								<TableCell>Last Revision</TableCell>
								<TableCell>Revision Field1</TableCell>

								<TableCell>Sub_Value</TableCell>
								<TableCell>Sub_Time</TableCell>
								<TableCell>Sub_Sid</TableCell>
								<TableCell>Sub_Source</TableCell>

								<TableCell>Con_Value</TableCell>
								<TableCell>Con_Time</TableCell>
								<TableCell>Con_Sid</TableCell>
								<TableCell>Con_Source</TableCell>
								
							</TableRow>
						</TableHead>
						<TableBody>
							{ this.viewAll() }
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}

	render0() { // with bootstrap
		//data
		//let varClass="btn btn-sm btn-";
		return (
			<div className="container">
				{ /*<Clock />
				{ /* passes petAdmission data to the pet object */ }
				<table border="1" className="table table-bordered table-striped table-hover dataTable no-footer">
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

	viewAll(){ //with booststrap & materialUI
		//console.log("pets.jsx - viewAll: ", this.props.admissions[0].record);
		//let tmpjson1=JSON.stringify(this.props.admissions[0]); 
		//console.log("pets-- ", JSON.parse(tmpjson1).objectId );
		//console.log("pets.jsx - viewAll: ", this.props.admissions[1]  );
		//this.getObjId(this.props.admissions[0]);

		return (
			this.props.admissions.map( (pet, index) => (
			//this.props.tickets.map( (pet, index) => (
				
				//{ JSON.stringify(this.props.admissions[0]) }
				//console.log("pets-- ", JSON.parse(tmpjson1).objectId );
				<Pet 
					//key={pet.id} 
					key={
						//pet.record
						this.getObjId(pet)
					} 
					//identifier={pet.id}
					identifier={ 
						this.getObjId(pet)
						//JSON.parse( JSON.stringify(pet) ).objectId
						//console.log( "pets identifier: ", pet ) //ok
					}
					//props={pet}
				/>
			)
			)
		);
	}

	/** Returns object id of nested object, in places where nested objects not supported */
	getObjId = (obj) =>{
		//console.log("pets - getobj obj: ", obj);
		//let tmpjson1=JSON.stringify(obj);
		//tmpjson1=JSON.parse(tmpjson1)
		//console.log("pets-- ", obj.objectId );
		return obj.objectId;
	}


	
}

//export default Pets;

const mapStateToProps = state => {
	console.log('pets.jsx-mapStateToProps', state); // seems ok
	return {
		admissions: state.admissions,
		tickets: state.tickets
	};
}

export default connect(mapStateToProps)(Pets);