
/**
	Single pet's information

	Popups found:
		https://www.npmjs.com/package/reactjs-popup
		https://minutemailer.github.io/react-popup/ -- last commit 3months ago

	Date pickers found:
		https://www.npmjs.com/package/react-datepicker

*/

import React, { Component } from 'react';
//import Popup from "../components/popupModal";
import Popup from "reactjs-popup";

import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PopDialog from "./popupModal";

//const dd=window.

class Pet extends Component {
	state = {
		title: "Dynamic title",
		id:this.props.id , 
		name:this.props.name , 
		speci:this.props.speci , 
		gender:this.props.gender , 
		years:this.props.years , 
		symptoms:this.props.symptoms , 
		admittedDate:this.props.admittedDate, 

		
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
		 //"Cold Bleeding Sleeping Swating Refusing Food }
	]

	render() {

		//console.log("props= ", this.props);
		//let varClass="btn btn-sm btn-";
		return (
			<React.Fragment>

				{ this.viewPet() }
				{ /* <button className="btn btn-sm btn-primary" >className= &#123; {} &#125;</button>
				<Popup trigger={<button>Trigger</button>} position="top left">
				    {close => (
				      <div>
				        Content here
				        <a className="close" onClick={close}>
				          &times;
				        </a>
				      </div>
				    )}
				  </Popup> */ }

				{ /*this.state.name */}

			</React.Fragment>
		) ;

	}

	viewPet(){
		return (
			<tr> 
				<td> { this.state.id } </td>

				<td> 
					{ console.log(this.state.name) }
					<PopDialog attr={ this.state.name }
						elementType="text"
						property="name"  >
					</PopDialog>
				</td>

				<td> 
				<PopDialog attr={ this.state.speci } 
					property="speci" >
					</PopDialog>
				</td>

				
				<td><PopDialog attr={ this.state.gender }  
					property="gender">
					</PopDialog></td>

				<td> 
				<PopDialog attr={ this.state.years }  
					property="age(years)">
					</PopDialog>
				</td>


				<td> 
				<PopDialog attr={ this.state.symptoms }  
					property="symptoms">
					</PopDialog>
				</td>

				<td> 
				<PopDialog attr={ this.state.admittedDate }  
					property="admitted date">
					</PopDialog>
				</td>
			</tr>

		);
	}

	handleChange=(event)=> {
		//this.props.
		this.setState({
			gender: event.target.value

		});
	}
	/*handleChange(event) {
		this.setState({
			gender: event.target.value
		});
	}*/
	updateValue=( property, value )=>{
		console.log("property=", property, "\nvalue=", value);
		this.setState( { property : value } )
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

	/*changeGender(){
		<Popup trigger={ <button className="button"> Open Moddal </button> } modal>
		    {close => (
			    <div className="modal">
			        <a className="close" onClick={close}> &times; </a>
			        <div className="header"> Modal Title </div>
			        <div className="content">
				        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
			        </div>
			        <div className="actions">
						<Popup
							trigger={<button className="button"> Trigger </button>}	position="top center" closeOnDocumentClick
						>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
							</span>
						</Popup>
			          	<button
			            	className="button"
			            	onClick={() => {
			              		console.log('modal closed ')
			              	close()
			            	}}
			          	>
			            	close modal
			          	</button>
			        </div>
			    </div>
		    )}
		</Popup>
	}*/

}

export default Pet;
