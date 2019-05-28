

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
								<TableCell>Sub_Value</TableCell>
								<TableCell>Sub_Time</TableCell>
								<TableCell>Sub_Sid</TableCell>
								<TableCell>Sub_Source</TableCell>

								<TableCell>Obj_Value</TableCell>
								<TableCell>Obj_Time</TableCell>
								<TableCell>Obj_Sid</TableCell>
								<TableCell>Obj_Source</TableCell>
								
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
		return (
			this.props.admissions.map( pet =>
				<Pet 
					key={pet.id} 
					identifier={pet.id}
				/>
			)
		);
	}


	
}

//export default Pets;

const mapStateToProps = state => {
	console.log('pets.jsx-mapStateToProps', state);
	return {
		admissions: state.admissions
	};
}

export default connect(mapStateToProps)(Pets);