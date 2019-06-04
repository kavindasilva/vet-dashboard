

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Record from '../phoenix/record';

import MaterialTable from 'material-table';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import phoenixAPI from "../apicalls/phoenix";
const phoenixAPIobj = new phoenixAPI();


class Records extends Component {

	table1Columns = [
		//{ title: '<to display>', field: 'to get frmo json' },
		
		{ title:'ID', field:'id' },
		{ title:'Name', field:'name' },
		{ title:'Hash', field:'hash' },
		{ title:'PMS', field:'pms' },
		{ title:'Server', field:'server' },
		{ title:'API Status', field:'api_status' },

		{ title:'Country', field:'country' },
		{ title:'City', field:'city' },
		{ title:'TimeZone', field:'timezone' },

		{ title:'BookingStatus', field:'bookingStatus' },
		{ title:'ApiTestLink', field:'apiTestLink' },
		{ title:'ApiStatusChecked', field:'apiStatusChecked' },
		{ title:'Appointments24', field:'appointments24' },

		{ title:'ApiTestLink', field:'apiTestLink' },
		{ title:'ApiFailures24', field:'apiFailures24' },
		{ title:'ApiFailureCode', field:'apiFailureCode' },
		{ title:'ApiFailureSince', field:'apiFailureSince' },

	];


	state = {
		phoenixRecords: [ 
			{ "name": "Loading...",
			  "hash": "5b4dafda8da05",
			  "api_failures_24": 0,
			  "appointments_24": 0,
			  "api_status": "Online" 
			}
		  ]
	};
	
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
		console.log("Records didMount - props", this.props);
		phoenixAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					//console.log("A");
					this.setState({ phoenixRecords: response.data })
				}
				return response;
			})
		//PetReducer( this.stateData, viewPet );
		//console.log(store);
		//this.setState({ phoenixRecords: this.props.stateInfo.phoenixRecords })

	}

	/**/componentDidMount0(){ // working
		console.log("Records - Mount");
		//let data = phoenixAPIobj.callApi()
		phoenixAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					//console.log("A");
					this.setState({ phoenixRecords: response.data })
				}
				return response;
			})
	
		//console.log(data);
		//let data = this.callApi0(); console.log("data", data);

	}/**/

	render(){ //with datatables, non editable
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<MaterialTable
						title="Editable Example"
						columns={ this.table1Columns }
						data={ this.state.phoenixRecords }
						
						editable={{
						onRowAdd: newData =>
							new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.phoenixRecords];
								data.push(newData);
								//setState({ ...state, data });
							}, 600);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.phoenixRecords];
								data[data.indexOf(oldData)] = newData;
								//setState({ ...state, data });
							}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.phoenixRecords];
								data.splice(data.indexOf(oldData), 1);
								//setState({ ...state, data });
							}, 600);
							}),
						}}
    				/>	
				</Paper>
			</div>
		)
	}

	render1(){ //with materialUI
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Hash</TableCell>
								<TableCell>PMS</TableCell>
								<TableCell>Server</TableCell>
								<TableCell>API Status</TableCell>

								<TableCell>Country</TableCell>
								<TableCell>City</TableCell>
								<TableCell>TimeZone</TableCell>
								
								<TableCell>BookingStatus</TableCell>
								<TableCell>ApiTestLink</TableCell>
								<TableCell>ApiStatusChecked</TableCell>
								<TableCell>Appointments24</TableCell>
								
								<TableCell>ApiTestLink</TableCell>
								<TableCell>ApiFailures24</TableCell>
								<TableCell>ApiFailureCode</TableCell>
								<TableCell>ApiFailureSince</TableCell>
								
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
				{ /* passes phoenixRecords data to the pet object */ }
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
			this.state.phoenixRecords.map( (pet, index) => (
			//this.props.tickets.map( (pet, index) => (
				
				//{ JSON.stringify(this.props.recordsData[0]) }
				//console.log("pets-- ", JSON.parse(tmpjson1).objectId );
				<Record 
					//key={pet.id} 
					key={
						pet.hash
						//this.getObjId(pet)
					} 
					//identifier={pet.id}
					identifier={ 
						pet.hash
						//this.getObjId(pet)
						//JSON.parse( JSON.stringify(pet) ).objectId
						//console.log( "pets identifier: ", pet ) //ok
					}

					recordData = { pet }
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

//export default Records;

const mapStateToProps = state => {
	console.log('pets.jsx-mapStateToProps', state); // seems ok
	return {
		recordsData: state.recordsData,
		tickets: state.tickets
	};
}

export default Records;