

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Record from '../phoenix/record';

import MaterialTable from 'material-table';
import MUIDataTable from "mui-datatables";


//import { withStyles } from "material-ui/styles";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import phoenixAPI from "../apicalls/phoenix";
const phoenixAPIobj = new phoenixAPI();

const styles = theme => ({
	root: {
	  width: "100%",
	  marginTop: theme.spacing.unit * 3,
	  overflowX: "auto"
	},
	head: {
	  backgroundColor: "#eee",
	  position: "sticky",
	  top: 0
	}
  });


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

	muiDtDummyData=[ 
		["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"],["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], ["t","T","t"], 
	]

	propStyle = this.props.classes;

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
			//overflowX: 'auto',
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

	render3(){ //with mui-datatables // header not sticky
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<MUIDataTable
						title={"Employee List"}
						data={ this.state.phoenixRecords }
						columns={ ["1", "2", "3"] }
						//options={  }
					/>
				</Paper>
			</div>
		);
	}

	render2(){ //with datatables, non editable // header not sticky
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<MaterialTable
						fixedHeader={ true }
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

	render(){ //with materialUI
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<Table >
						<TableHead>
							{/*<TableRow style={ { position: "fixed" } }>*/}
							<TableRow>
								<TableCell className={this.propStyle.head}>ID</TableCell>
								<TableCell className={this.propStyle.head}>Name</TableCell>
								<TableCell className={this.propStyle.head}>Hash</TableCell>
								<TableCell className={this.propStyle.head}>PMS</TableCell>
								<TableCell className={this.propStyle.head}>Server</TableCell>
								<TableCell className={this.propStyle.head}>API Status</TableCell>

								<TableCell className={this.propStyle.head}>Country</TableCell>
								<TableCell className={this.propStyle.head}>City</TableCell>
								<TableCell className={this.propStyle.head}>TimeZone</TableCell>
								
								<TableCell className={this.propStyle.head}>BookingStatus</TableCell>
								<TableCell className={this.propStyle.head}>ApiTestLink</TableCell>
								<TableCell className={this.propStyle.head}>ApiStatusChecked</TableCell>
								<TableCell className={this.propStyle.head}>Appointments24</TableCell>
								
								<TableCell className={this.propStyle.head}>ApiTestLink</TableCell>
								<TableCell className={this.propStyle.head}>ApiFailures24</TableCell>
								<TableCell className={this.propStyle.head}>ApiFailureCode</TableCell>
								<TableCell className={this.propStyle.head}>ApiFailureSince</TableCell>
								
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

//export default Records;
export default withStyles(styles)(Records);