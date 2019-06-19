

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Pet from '../components/pet';
// import { rootStore } from "../stores/pets";

import PetReducer from '../reducers/pets'
import { connect } from "react-redux";

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

	componentDidMount(){
		console.log("Pets didMount - props", this.props);
	}

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
	

	viewAll(){ //with booststrap & materialUI
		return (
			//this.props.PetReducer.admissions.map( (pet, index) => (
			this.props.admissions.map( (pet, index) => (
			//this.props.tickets.map( (pet, index) => (
				<Pet 
					//key={pet.id} 
					key={
						this.getObjId(pet)
					} 
					identifier={ 
						this.getObjId(pet)
					}
				/>
			)
			)
		);
	}

	/** Returns object id of nested object, in places where nested objects not supported */
	getObjId = (obj) =>{
		//console.log("pets - getobj obj: ", obj);
		return obj.objectId;
	}
	
}

//export default Pets;

const mapStateToProps = state => {
	console.log('pets.jsx-mapStateToProps', state); // seems ok
	return {
		admissions: state.PetReducer.admissions,
		//tickets: state.tickets
	};
}

export default connect(mapStateToProps)(Pets);