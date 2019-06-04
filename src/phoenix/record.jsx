
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
	

	/** Sample method to check child to parent data passing working */
	retrieveFromPopup = (property, value) => {
		//console.log("Record store: ", store.getState() ); // whole store
		//PetReducer( petStore.getState(), updatePet( { propert: property, val: value, idd: this.props.objectId } ) );

		switch(property){
			case "name":
				this.setState({ name : value }); console.log("Name=", this.state.name);
				break;
			case "speci": 
				this.setState({ speci : value }); console.log("Speci=", this.state.speci);
				break;

			case "gender" :
				this.setState({ gender : value }); console.log("Gender=", this.state.gender);
				break;
			case "years" :
				this.setState({ years : value }); console.log("years=", this.state.years);
				break;

			case "symptoms" :
				this.setState({ symptoms : value }); console.log("symptoms=", this.state.symptoms);
				break;
			case "admittedDate" :
				this.setState({ admittedDate : value }); console.log("admitDate=", this.state.admittedDate);
				break;

			default:
				console.log("record.jsx -> default case");
		}

		console.log("retrieve data called");
	}

	viewPet(){ // with mmterialUI : tr -> TableRow; td -> TableCell
		return (
			<TableRow> 
				<TableCell> { this.props.portalId } </TableCell>				
				<TableCell> { this.props.recordData.name } </TableCell>
				<TableCell> { this.props.recordData.hash } </TableCell>
				<TableCell> { this.props.recordData.api_failures_24 } </TableCell>
				<TableCell> { this.props.recordData.appointments_24 } </TableCell>
				<TableCell> { this.props.recordData.api_status } </TableCell>

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
					//this.state["properties"].content.value
					//this.props.sub_value
					//this.props.properties.content.value
					//this.props.properties
					//this.props.properties.find(value => "0" === )
					//this.props["properties"].filter()
					//this.props["properties"]["content"]["value"]
					//console.log("record props",this.props)
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
	let tickRecord = state.tickets.find(record => myProps.identifier == record.ticket_id );
	//console.log("record - mapStateToProps tickState:", state);
	console.log("record - mapStateToProps tickRec:", tickRecord );

	let record = state.admissions.find(record => myProps.identifier === record.objectId );
	//let record = state.admissions.find(record => myProps.identifier === 28868823);
	//let rec_properties_sub={ ...{...record.properties}.subject };
	//let rec_properties_con={ ...{...record.properties}.content };
	return {
		...record,
		...tickRecord,

		/*sub_value: rec_properties_sub.value,
		sub_source: rec_properties_sub.source,
		sub_sourceId: rec_properties_sub.sourceId,
		sub_timestamp: rec_properties_sub.timestamp,

		con_value: rec_properties_con.value,
		con_source: rec_properties_con.source,
		con_sourceId: rec_properties_con.sourceId,
		con_timestamp: rec_properties_con.timestamp,/**/
		//...record.properties
	};
}


//export default Record;
//export default connect()(Record);
//export default connect(mapStateToProps, mapDispatchToProps)(Record);
export default Record;
