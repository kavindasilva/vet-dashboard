
/**
	Single pet's information

	Popups found:
		https://www.npmjs.com/package/reactjs-popup
		https://minutemailer.github.io/react-popup/ -- last commit 3months ago

	Date pickers found:
		https://www.npmjs.com/package/react-datepicker

*/

import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import PopDialog from "./popupModal";

import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { stat } from 'fs';


class Pet extends Component {
	//state = { ...this.props }
	state={}

	componentDidMount(){
		console.log("pet - cons props: ", this.props);
		console.log("pet - cons state: ", this.state);
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
				<TableCell> { this.props.objectId } </TableCell>
				<TableCell> { this.props.portalId } </TableCell>

				<TableCell>
					<PopDialog 
						value={ this.props.review_date }  
						elementType="date"
						identifier={ this.props.objectId }
						property="review_date">
					</PopDialog>
				</TableCell>
				
				<TableCell>
					<PopDialog 
						value={ this.props.additional1 }  
						elementType="text"
						identifier={ this.props.objectId }
						property="additional1">
					</PopDialog>
				</TableCell>
				

				<TableCell> 
					<PopDialog 
						value={ this.props.sub_value }  
						elementType="text"
						identifier={ this.props.objectId }
						data={ { valueSet:["Male", "Female"], defaultVal:this.props.gender } }
						property="sub_value">
					</PopDialog>
					 
				</TableCell>
				<TableCell> {
					 this.props.sub_timestamp 
					 //this.state.portalId
				} </TableCell>

				<TableCell>
					{ this.props.sub_sourceId }
				</TableCell>
				<TableCell> 
					<PopDialog 
						value={ this.props.sub_source } 
						elementType="text"
						identifier={ this.props.objectId }
						data={ {defaultVal:this.props.speci , 
							defValDisp:this.props.speci, 
							valueSet:this.species }}
						property="speci" >
					</PopDialog>
				</TableCell>
				
				
				<TableCell>
					<PopDialog 
						value={ this.props.con_value }  
						elementType="text"
						identifier={ this.props.objectId }
						data={ { valueSet:["Male", "Female"], defaultVal:this.props.gender } }
						property="gender">
					</PopDialog>
				</TableCell>
				<TableCell> 
					<PopDialog 
						value={ this.props.con_timestamp }  
						identifier={ this.props.objectId }
						elementType="text"
						property="years">
					</PopDialog>
				</TableCell>
				<TableCell> 
					{ //this.props.symptoms ?
					<PopDialog 
						value={ this.props.con_sourceId } 
						identifier={ this.props.objectId }
						elementType="text"
						data={ { defaultVal:this.props.symptoms, valueSet:this.symptomsInfo }  }
						property="symptoms">
					</PopDialog>
					//: "NA" 
					}
				</TableCell>
				<TableCell> 
					<PopDialog 
						value={ this.props.con_source } 
						identifier={ this.props.objectId } 
						elementType="text"
						data={ {val:this.props.admittedDate} }
						property="admittedDate">
					</PopDialog>
				</TableCell> 
			</TableRow>
		);
	}

}

const mapStateToProps = (state, myProps) => {
	// finds the 1st matching record
	let tickRecord = state.PetReducer.tickets.find(record => myProps.identifier == record.ticket_id );
	//console.log("pet - mapStateToProps tickState:", state); // keep to debug
	console.log("pet - mapStateToProps tickRec:", tickRecord );

	let record = state.PetReducer.admissions.find(record => myProps.identifier === record.objectId );
	return {
		...record,
		...tickRecord,
	};
}


//export default Pet;
//export default connect()(Pet);
//export default connect(mapStateToProps, mapDispatchToProps)(Pet);
export default connect(mapStateToProps)(Pet);
