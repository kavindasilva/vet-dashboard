
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
//import { viewPet, updatePet, viewNewPet } from '../actions/index'
//import { petStore } from "../stores/pets";
//import PetReducer from '../reducers/pets';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


//global JS variable for popup open detection
//const dd=window.

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
	

	/** Sample method to check child to parent data passing working */
	retrieveFromPopup = (property, value) => {
		//console.log("Pet store: ", store.getState() ); // whole store
		//PetReducer( petStore.getState(), updatePet( { propert: property, val: value, idd: this.props.id } ) );

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
				console.log("pet.jsx -> default case");
		}

		console.log("retrieve data called");
	}

	viewPet(){ // with mmterialUI : tr -> TableRow; td -> TableCell
		return (
			<TableRow> 
				<TableCell> { this.props.objectId } </TableCell>
				<TableCell> { this.props.portalId } </TableCell>

				<TableCell> 
					{ 
						//this.state.portalId
						//this.state["properties"].content.value
						//this.props.sub_value
						//this.props.properties.content.value
						//this.props.properties
						//this.props.properties.find(value => "0" === )
						//this.props["properties"].filter()
						//this.props["properties"]["content"]["value"]
						//console.log("pet props",this.props)
					} 
				</TableCell>
				<TableCell> {  } </TableCell>

				<TableCell>
					<PopDialog
						//sendToParent={this.retrieveFromPopup}
						elementType="text"
						identifier={ this.props.id }
						property="name"
						value={ this.props.name }>
					</PopDialog>
				</TableCell>

				 
				<TableCell> 
					<PopDialog 
						value={ this.props.speci } 
						elementType="select"
						identifier={ this.props.id }
						data={ {defaultVal:this.props.speci , 
							defValDisp:this.props.speci, 
							valueSet:this.species }}
						property="speci" >
					</PopDialog>
				</TableCell>
				<TableCell>
					<PopDialog 
						value={ this.props.gender }  
						elementType="radio"
						identifier={ this.props.id }
						data={ { valueSet:["Male", "Female"], defaultVal:this.props.gender } }
						property="gender">
					</PopDialog>
				</TableCell>
				<TableCell> 
					<PopDialog 
						value={ this.props.years }  
						identifier={ this.props.id }
						elementType="number"
						property="years">
					</PopDialog>
				</TableCell>
				<TableCell> 
					{ this.props.symptoms ?
					<PopDialog 
						value={ this.props.symptoms } 
						identifier={ this.props.id }
						elementType="checkBox"
						data={ { defaultVal:this.props.symptoms, valueSet:this.symptomsInfo }  }
						property="symptoms">
					</PopDialog>
					: "NA" }
				</TableCell>
				<TableCell> 
					<PopDialog 
						value={ this.props.admittedDate } 
						identifier={ this.props.id } 
						elementType="date"
						data={ {val:this.props.admittedDate} }
						property="admittedDate">
					</PopDialog>
				</TableCell> 
			</TableRow>
		);
	}

}

//const uns=petStore.subscribe(th)

const mapStateToProps = (state, myProps) => {
	let record = state.admissions.find(record => myProps.identifier === record.objectId );
	//let record = state.admissions.find(record => myProps.identifier === 28868823);
	//let rec_properties_sub={ ...{...record.properties}.subject };
	//let rec_properties_con={ ...{...record.properties}.content };
	return {
		...record

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


//export default Pet;
//export default connect()(Pet);
//export default connect(mapStateToProps, mapDispatchToProps)(Pet);
export default connect(mapStateToProps)(Pet);
