//import {APP_MODE} from "../common/constants"
/**

*/

import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import PopDialog from "../components/popupModal";

import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { stat } from 'fs';

class Record extends Component {
	//state = { ...this.props }
	state={}

	componentDidMount(){
		console.log("record - cons props: ", this.props);
		console.log("record - cons state: ", this.state);
	}

	
	tempValue=null;
	species = [
		{ value: "Bird", label: "Bird" },
		{ value: "Cat",  label: "Cat" },
		{ value: "Dog",  label: "Dog" },
	];

	symptomsInfo =[
		 { id:0, name:"Bleeding", value:"Bleeding" },
		 { id:1, name:"Cold", value:"Cold"  },
		 { id:2, name:"RefusingFood", value:"Refusing Food"  },
		 { id:3, name:"Sleeping", value:"Sleeping"  },
		 { id:4, name:"Swating", value:"Swating"  },
		 { id:5, name:"Fever", value:"Fever"  },
		 // { key:0, name:0, label:0 }
	]

	render() {
		return (
			<React.Fragment>
				{ this.viewPet() }
			</React.Fragment>
		) ;

	}
	
	viewPet(){ // with mmterialUI : tr -> TableRow; td -> TableCell
		return (
			<TableRow> 
				<TableCell> { this.props.recordData.id } </TableCell>				
				<TableCell> { this.props.recordData.name } </TableCell>
				<TableCell> { this.props.recordData.hash } </TableCell>
				<TableCell> { this.props.recordData.pms } </TableCell>
				<TableCell> { this.props.recordData.server } </TableCell>
				<TableCell> { this.props.recordData.api_status } </TableCell>

				<TableCell> { this.props.recordData.country } </TableCell>
				<TableCell> { this.props.recordData.city } </TableCell>
				<TableCell> { this.props.recordData.timezone } </TableCell>

				<TableCell> { this.props.recordData.bookingStatus } </TableCell>
				<TableCell> { this.props.recordData.apiTestLink } </TableCell>
				<TableCell> { this.props.recordData.apiStatusChecked } </TableCell>
				<TableCell> { this.props.recordData.appointments24 } </TableCell>

				<TableCell> { this.props.recordData.apiTestLink } </TableCell>
				<TableCell> { this.props.recordData.apiFailures24 } </TableCell>
				<TableCell> { this.props.recordData.apiFailureCode } </TableCell>
				<TableCell> { this.props.recordData.apiFailureSince } </TableCell>

				<TableCell> {
					 this.props.sub_timestamp 
					 //this.state.portalId
				} </TableCell>

				<TableCell>
					{ this.props.sub_sourceId }
				</TableCell>
			
			</TableRow>
		);
	}

}

const mapStateToProps = (state, myProps) => {
	// finds the 1st matching record
	let tickRecord = state.tickets.find(record => myProps.identifier == record.ticket_id );
	//console.log("record - mapStateToProps tickState:", state);
	console.log("record - mapStateToProps tickRec:", tickRecord );

	let record = state.admissions.find(record => myProps.identifier === record.objectId );
	//let record = state.admissions.find(record => myProps.identifier === 28868823);
	return {
		...record,
		...tickRecord,
	};
}


//export default Record;
//export default connect()(Record);
//export default connect(mapStateToProps, mapDispatchToProps)(Record);
export default Record;
