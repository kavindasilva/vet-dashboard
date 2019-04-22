
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

	render() {

		//console.log("props= ", this.props);
		let varClass="btn btn-sm btn-";
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
					<Popup trigger={ <button className="btn btn-sm btn-link" > { this.state.name } , </button>  } position="top left">
					    {close => (
						    <div>
						     	<a className="close" onClick={close}> &times; </a>
						     	{ this.tempValue=this.state.name }
						     	<b>Change Name</b> <br/>
						     	<input type="text" name="txtName" value={this.props.name} onChange={ this.handleChange }  /> <br/>
						     	<button onClick={ () => this.updateValue('gender', this.tempValue) } className="btn btn-sm btn-link" >OK</button>
						     	<button onClick={ () => this.updateValue('gender', this.state.gender) } className="btn btn-sm btn-link" >Cancel</button>
						    </div>
					    )}
					</Popup>
					{ this.state.name } </td>

				<td> { this.state.speci } </td>

				
				<td><Popup trigger={ <button className="btn btn-sm btn-link" > { this.state.gender } , </button>  } position="top left">
				    {close => (
				    <div>
				     	<a className="close" onClick={close}> &times; </a>
				     	{ this.tempValue=this.state.gender }
				     	<b>Select gender</b> <br/>
				     	Male<input type="radio" name="radioGender" value="Male" onChange={ this.handleChange } checked={this.state.gender==="Male"} /> <br/>
				     	Female<input type="radio" name="radioGender" value="Female" onChange={ this.handleChange } checked={this.state.gender==="Female"} /> <br/>

				     	<button onClick={ () => this.props.updateGender(this.props.id, this.tempValue) } className="btn btn-sm btn-link" >OK0</button>
				     	<button onClick={ () => this.props.updateGender(this.props.id, this.state.gender) } className="btn btn-sm btn-link" >Cancel0</button>

				     	<button onClick={ () => this.updateValue('gender', this.tempValue) } className="btn btn-sm btn-link" >OK</button>
				     	<button onClick={ () => this.updateValue('gender', this.state.gender) } className="btn btn-sm btn-link" >Cancel</button>
				      </div>
				    )}
				</Popup></td>

				<td> { this.state.years } </td>
				<td> { this.state.symptoms } </td>
				<td> { this.state.admittedDate } </td>
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
		this.setState( { property : value } )
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
