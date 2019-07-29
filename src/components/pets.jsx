

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Pet from '../components/pet';

import { rootStore } from "../stores/mainStore";
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
import ticketAPI from "../apicalls/ticketAPI";

const petAPIobj = new petAPI();
const ticketAPIobj = new ticketAPI();

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
		this.loadInitialData();
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

	loadInitialData = () => {
		this.loadData(0,0); // working
	}

	loadData(property, value){ 
		console.log("App - loadData");
		let data = petAPIobj.callGraphQL( property, value )
			.then( response => {
				console.log("app.jsx - response1: ",response);
				if( response.data ){
					console.log("app.jsx - componenetDidMount");
					this.setState({ petAdmission: response.data.tickets })
					return response;
				}
			})
			.then(
				response => {
					console.log("app.jsx - response2: ", response);

					rootStore.dispatch({
						type: 'FETCH_FROM_API',
						payload: {
							hubspotData: response.data.tickets
						}
					})
				}
			)

		this.loadTickets(0);
	}

	loadTickets = ( ticketid ) => {
		console.log("App - loadTickets");
		let data = ticketAPIobj.callApiDb( )
			.then( response => {
				console.log("app.jsx - Tresponse1: ",response);

				console.log("app.jsx - componenetDidMount");
				this.setState({ petAdmission: response.data })
				return response;

			})
			.then(
				response => {
					console.log("app.jsx - Tresponse2: ", response);

					rootStore.dispatch({
						type: 'FETCH_TICKETS_FROM_API',
						payload: {
							ticketData: response.data
						}
					})

				}
			) /* */
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