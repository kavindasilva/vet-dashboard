

/**
	Details about all pets
*/

import React, { Component } from 'react';
import Record from '../phoenix/record';

import MaterialTable from 'material-table';
import MUIDataTable from "mui-datatables";


import { rootStore } from "../stores/pets";
import { connect } from 'react-redux';

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

	table2Columns = [
		//{ title: '<to display>', field: 'to get frmo json' },
		
		{ label:'ID', name:'id' },
		{ label:'Name', name:'name' },
		{ label:'Hash', name:'hash' },
		{ label:'PMS', name:'pms' },
		{ label:'Server', name:'server' },
		{ label:'API Status', name:'api_status' },

		{ label:'Country', name:'country' },
		{ label:'City', name:'city' },
		{ label:'TimeZone', name:'timezone' },

		{ label:'BookingStatus', name:'bookingStatus' },
		{ label:'ApiTestLink', name:'apiTestLink' },
		{ label:'ApiStatusChecked', name:'apiStatusChecked' },
		{ label:'Appointments24', name:'appointments24' },

		{ label:'ApiTestLink', name:'apiTestLink' },
		{ label:'ApiFailures24', name:'apiFailures24' },
		{ label:'ApiFailureCode', name:'apiFailureCode' },
		{ label:'ApiFailureSince', name:'apiFailureSince' },

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
			//width: '100%',
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
					this.setState({ phoenixRecords: response.data })
					this.dispatchUpdate();
				}
				return response;
			})

	}

	/**/componentDidMount0(){ // working
		console.log("Records - Mount");
		//let data = phoenixAPIobj.callApi()
		phoenixAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					this.setState({ phoenixRecords: response.data })
					this.dispatchUpdate();
				}
				return response;
			})
	
		//console.log(data);
		//let data = this.callApi0(); console.log("data", data);

	}/**/

	render(){ //with mui-datatables // header sticky //more funtions
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<MUIDataTable
						//size={'small'}
						title={"Phoenix Tickets"}
						data={ this.state.phoenixRecords }
						columns={ this.table2Columns }
						options={ 
							{
								responsive:"scroll",
								fixedHeader: true,
								elevation:0,
								selectableRows:'none',
							}
						}
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

	render1(){ //with materialUI //sticky
		return(
			<div className="container">
				<Paper style={ this.styleMatUI.table }>
					<Table size={'small'}>
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

	viewAll(){ //with booststrap & materialUI

		return (
			this.props.phoenixRecords.map( (pet, index) => (
				//console.log("records-- ", JSON.parse(tmpjson1).objectId );
				<Record 
					//key={pet.id} 
					key={
						pet.hash
					} 
					identifier={ 
						pet.hash
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
		//console.log("Records-- ", obj.objectId );
		return obj.objectId;
	}

	dispatchUpdate = () => {
		rootStore.dispatch({
			type: 'UPDATE_PHOENIX_DATA',
			payload: {
				//isLoggedIn: false,
				//userID: 250
				phoenixRecords: {...this.state.phoenixRecords }
			}
		});
	}

}

const mapStateToProps = state => {
	console.log('records.jsx-mapStateToProps', state); // seems ok
	return {
		recordsData: state.PetReducer.phoenixRecords
		//tickets: state.tickets
	};
}

//export default Records;
//export default withStyles(styles)(Records);
export default connect(mapStateToProps)(withStyles(styles)(Records));