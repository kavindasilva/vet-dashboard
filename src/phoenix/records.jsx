

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Record from '../phoenix/record';


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

	render(){ //with materialUI
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Hash</TableCell>
								<TableCell>API failures</TableCell>
								<TableCell>Appoinments</TableCell>
								<TableCell>Status</TableCell>

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