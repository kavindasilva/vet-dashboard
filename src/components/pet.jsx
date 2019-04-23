
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
					<Popup trigger={ <span > { this.state.name }  </span>  } position="bottom left">
					    {close => (
						    <div>
						     	<a href="#" className="close" onClick={close}> &times; </a>
						     	{ /*this.tempValue=this.state.name*/ }
						     	<b>Change Name</b> <br/>
						     	<input type="text" name="txtName" value={this.state.name} 
						     		onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

						     	<a onClick={close} >
						     		<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
						     	</a>
						     	{<a onClick={close} >
									<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
								</a>}
						    </div>
					    )}
					</Popup>
				</td>

				<td> 
					<Popup trigger={ <span > { this.state.speci }  </span>  } position="bottom left">
					    {close => (
						    <div>
						     	<a href="#" className="close" onClick={close}> &times; </a>
						     	{ /*this.tempValue=this.state.speci*/ }
						     	<b>Change Name</b> <br/>
						     	{/* <input type="text" name="txtName" value={this.state.speci} 
						     		onChange={ e => this.setState({ speci: e.target.value }) }  /> */} 
						     	<Select options={ this.species }
						     		defaultValue={{ value: this.state.speci , label: this.state.speci }}
						     		onChange={ e => this.setState({ speci: e.label }) }
						     		/*value={"cat"}*/ />
						     	<br/>

						     	<a onClick={close} >
						     		<button onClick={ () => { this.setState({ speci:this.state.speci }); } } className="btn btn-sm btn-link" >OK</button>
						     	</a>
						     	{<a onClick={close} >
									<button onClick={ () => this.setState({ speci:this.props.speci }) } className="btn btn-sm btn-link" >Cancel</button>
								</a>}
						    </div>
					    )}
					</Popup>
				</td>

				
				<td><Popup trigger={ <button className="btn btn-sm btn-link" > { this.state.gender } , </button>  } position="bottom left">
				    {close => (
				    <div>
				     	<a href="#" className="close" onClick={close}> &times; </a>
				     	{ /*this.tempValue=this.state.gender*/ }
				     	<b>Select gender</b> <br/>
				     	Male<input type="radio" name="radioGender" value="Male" onChange={ this.handleChange } checked={this.state.gender==="Male"} /> <br/>
				     	Female<input type="radio" name="radioGender" value="Female" onChange={ this.handleChange } checked={this.state.gender==="Female"} /> <br/>

				     	<a onClick={close} >
				     		<button onClick={ () => { this.setState({ gender:this.state.gender }); } } className="btn btn-sm btn-link" >OK</button>
				     	</a>
				     	<a onClick={close} >
							<button onClick={ () => this.setState({ gender:this.props.gender }) } className="btn btn-sm btn-link" >Cancel</button>
						</a>
				     	
				      </div>
				    )}
				</Popup></td>

				<td> 
					<Popup trigger={ <span > { this.state.years }  </span>  } position="bottom left">
					    {close => (
						    <div>
						     	<a href="#" className="close" onClick={close}> &times; </a>
						     	{ /*this.tempValue=this.state.years*/ }
						     	<b>Change Age (years)</b> <br/>
						     	<input type="number" name="txtAge" value={this.state.years} 
						     		onChange={ e => this.setState({ years: e.target.value }) }  /> <br/>

						     	<a onClick={close} >
						     		<button onClick={ () => { this.setState({ years:this.state.years }); } } className="btn btn-sm btn-link" >OK</button>
						     	</a>
						     	{<a onClick={close} >
									<button onClick={ () => this.setState({ years:this.props.years }) } className="btn btn-sm btn-link" >Cancel</button>
								</a>}
						    </div>
					    )}
					</Popup>
				</td>


				<td> 
					<Popup trigger={ <span > { this.state.name }  </span>  } position="bottom left">
					    {close => (
						    <div>
						     	<a href="#" className="close" onClick={close}> &times; </a>
						     	{ /*this.tempValue=this.state.name*/ }
						     	<b>Change Name</b> <br/>
						     	<input type="text" name="txtName" value={this.state.name} 
						     		onChange={ e => this.setState({ name: e.target.value }) }  /> <br/>

						     	<a onClick={close} >
						     		<button onClick={ () => { this.setState({ name:this.state.name }); } } className="btn btn-sm btn-link" >OK</button>
						     	</a>
						     	{<a onClick={close} >
									<button onClick={ () => this.setState({ name:this.props.name }) } className="btn btn-sm btn-link" >Cancel</button>
								</a>}
						    </div>
					    )}
					</Popup>
				</td>

				<td> 
					<Popup trigger={ <span > { this.state.admittedDate }  </span>  } position="bottom left">
					    {close => (
						    <div>
						     	<a href="#" className="close" onClick={close}> &times; </a>
						     	{ /*this.tempValue=this.state.admittedDate*/ }
						     	<b>Change Admitted Date</b> <br/>
						     	<DatePicker selected={this.state.admittedDate} onChange={this.changeAdmitDate} dateFormat="YYYY-MM-DD" /> <br/>
						     	<br/>
						     	<button onClick={ () => this.updateValue('gender', this.tempValue) } className="btn btn-sm btn-link" >OK</button>
						     	<button onClick={ () => this.updateValue('gender', this.state.gender) } className="btn btn-sm btn-link" >Cancel</button>
						    </div>
					    )}
					</Popup>
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

	changeAdmitDate=(event)=>{
		event=event.format('YYYY-MM-DD');
		console.log(event);
		//this.setState({ admittedDate: event.target.value })
		this.setState({ admittedDate: event });
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
