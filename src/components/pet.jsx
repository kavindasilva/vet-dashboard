
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
import { viewPet, updatePet, viewNewPet } from '../actions/index'
import { petStore } from "../stores/pets";
import PetReducer from '../reducers/pets';


//const dd=window.

class Pet extends Component {
	//state ={ name: "pet_defaultName" }
	state = {
		title: "Dynamic title",
		...this.props.petRecord
	}

	//state = petStore.getState().admissions.filter(pet => pet.id == this.props.key);
	

	constructor(props){
		console.log(props);
		super(props);
	}

	stateData = {  }

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
		PetReducer( petStore.getState(), updatePet( { propert: property, val: value, idd: this.props.id } ) );

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

	viewPet(){
		return (
			<tr> 
				<td> { this.state.id } </td>

				<td>
					<PopDialog
						//sendToParent={this.retrieveFromPopup}
						elementType="text"
						identifier={ this.state.id }
						property="name"
						value={ this.state.name }>
					</PopDialog>
				</td>

				{/**/} 
				<td> 
					<PopDialog 
						value={ this.state.speci } 
						elementType="select"
						identifier={ this.state.id }
						data={ {defaultVal:this.state.speci , 
							defValDisp:this.state.speci, 
							valueSet:this.species }}
						property="speci" >
					</PopDialog>
				</td>
				<td>
					<PopDialog 
						value={ this.state.gender }  
						elementType="radio"
						identifier={ this.state.id }
						data={ { valueSet:["Male", "Female"], defaultVal:this.state.gender } }
						property="gender">
					</PopDialog>
				</td>
				<td> 
					<PopDialog 
						value={ this.state.years }  
						identifier={ this.state.id }
						elementType="number"
						property="years">
					</PopDialog>
				</td>
				<td> 
					<PopDialog 
						value={ this.state.symptoms } 
						identifier={ this.state.id }
						elementType="checkBox"
						data={ { defaultVal:this.state.symptoms, valueSet:this.symptomsInfo }  }
						property="symptoms">
					</PopDialog>
				</td>
				<td> 
					<PopDialog 
						value={ this.state.admittedDate } 
						identifier={ this.state.id } 
						elementType="date"
						data={ {val:this.state.admittedDate} }
						property="admittedDate">
					</PopDialog>
				</td> { /* */}
			</tr>
		);
	}

	// before redux
	updateValue0=( property, value )=>{
		console.log("property=", property, "\nvalue=", value);
		this.setState( { property : value } )
	}
	
	// with redux
	updateValue = (property, value) => {
		console.log("property=", property, "\nvalue=", value);
		this.props.dispatch({ type: "INCREMENT" });
	};


	handleChange=(event)=> {
		//this.props.
		this.setState({
			gender: event.target.value

		});
	}

	changeAdmitDate=(admitDate)=>{
		//{ admitDate=admitDate.format('YYYY-MM-DD');} // Wed Apr 24 2019 00:00:00 GMT+0530 (India Standard Time)
		admitDate =  new Date( admitDate );
		admitDate = admitDate.getFullYear()+"-"+
			( admitDate.getMonth()<=8 ? "0"+(admitDate.getMonth()+1) : (admitDate.getMonth()+1) ) +"-"+
			( admitDate.getDate()<=9 ? "0"+admitDate.getDate() : admitDate.getDate() );

		console.log(admitDate);
		//this.setState({ admittedDate: admitDate.target.value })
		this.setState({ admittedDate: admitDate });
	}

	changeName = (text) => {
		this.setState({ name: text });
	}

	changeAge = (text) => {
		this.setState({ years: text });
	}

}

const mapDispatchToProps = {
	//increment
	//updateValue
	//decrement
};

function mapStateToProps(state) {
//mapStateToProps(state) {
	return {
		count: state.count
	};
}

//export default Pet;
export default connect(mapStateToProps, mapDispatchToProps)(Pet);
