
import React, { Component } from 'react';

import App from "../components/app";
import Records from "../phoenix/records";

import Button from '@material-ui/core/Button';


class Menu extends Component {
	state={
		showApp: false,
		showPh: false,

		showComp: 'def',
	}

	render() {
		//console.log('Menu.jsx-rendering' );
		return (
			<React.Fragment>
				{ this.viewMenuBar() }
				{ this.showComponent() 
				}
			</React.Fragment>
		);
	}

	viewMenuBar(){
		return(
			<div>
				Temporary menu bar: 
				<Button onClick={ ()=>{ this.switchComponents('app') } } >Ticket</Button>
				<Button onClick={ ()=>{ this.switchComponents('records') } } >Phoenix</Button>
			</div>
		);
	}

	componentDidMount(){ 
		//this.loadInitialData();
		//this.loadData(0,0);
		//this.loadData("speci","Cat");
	}

	/** determine which compoenent to be rendered */
	showComponent(){
		let componentToShow = this.state.showComp;
		if( componentToShow=="app" )
			return <App />
		else if( componentToShow=="records" )
			return <Records />
		else
			return "no app";

		/* * /if( this.state.showApp )
			return <App />
		else if( this.state.showPh )
			return <Records />
		else
			return "no app"; /* */

		//let componentToShow = this.state.showComp;

	}

	/** make clicked componenents state value true */
	switchComponents(clickedComponent){
		console.log("menu - switchComps: ", clickedComponent);
		this.setState( { showComp: clickedComponent } );

		//this.showComponent();
	}

}

//export default App;
export default Menu;
