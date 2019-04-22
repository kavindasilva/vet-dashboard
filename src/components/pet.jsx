
/**
	Basics
*/

import React, { Component } from 'react';

class Pet extends Component {
	state = {
		title: "Dynamic title",
		id:this.props.id , 
		name:this.props.name , 
		speci:this.props.speci , 
		gender:this.props.gender , 
		years:this.props.years , 
		symptoms:this.props.symptoms , 
		admittedDate:this.admittedDate 
	}

	render() {

		console.log("props= ", this.props)		;
		let varClass="btn btn-sm btn-";
		return (
			<React.Fragment>

				{ this.viewPet() }
				{ /*this.state.name */}

			</React.Fragment>
		) ;

	}

	viewPet(){
		return (
			<p><span> 
				{ this.state.id } ,
				{ this.state.name } ,
				{ this.state.speci } ,
				{ this.state.gender } ,
				{ this.state.years } ,
				{ this.state.symptoms } ,
				{ this.state.admittedDate } 
			</span></p>
		);
	}

}

export default Pet;
