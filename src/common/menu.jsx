

import React, { Component } from 'react';


import { connect } from "react-redux";
import { petStore } from "../stores/pets"


import App from "../components/app";
import Records from "../phoenix/records";
import Pets from "../components/pets";

import Button from '@material-ui/core/Button';


class Menu extends Component {
	state={
		showApp: false,
		showPh: false,

		componentToShow: 'def',
		menuBarVisible: false,
	}

	render() {
		//console.log('Menu.jsx-rendering' );
		return (
			<React.Fragment>
				{ 
					this.viewMenuBar() 
				}
				{ 
					this.componentToShow() 
				}
			</React.Fragment>
		);
	}

	viewMenuBar(){
		return(
			<div>
				<div>
					<Button style={{cursor:'pointer',float:'right',align:'right'}}
						onClick={ () => { this.logOutUser() } }
					>
						LogOut
					</Button> <hr />
				</div>

				Temporary menu bar: 
				<Button onClick={ ()=>{ this.switchComponents('app') } } >Ticket</Button>
				<Button onClick={ ()=>{ this.switchComponents('records') } } >Phoenix</Button>
			</div>
		);
	}

	componentDidMount(){ 
		//this.loadInitialData();
	}

	/** determine which compoenent to be rendered */
	componentToShow(){
		let componentToShow = this.state.componentToShow;
		if( componentToShow=="app" )
			//return <App />
			return <Pets />
		else if( componentToShow=="records" )
			return <Records />
		else
			return "no app";

	}

	/** make clicked componenents state value true */
	switchComponents(clickedComponent){
		console.log("menu - switchComps: ", clickedComponent);
		this.setState( { componentToShow: clickedComponent } );
	}

	/** logout user */
	logOutUser = () => {
		this.dispatchLogout()
	}

	dispatchLogout = () => {
		petStore.dispatch({
			type: 'UPDATE_META_DETAIL',
			payload: {
				//isLoggedIn: false,
				//userID: 250
				loggedData: {...this.state.serverData, isLoggedIn: false }
			}
		});
	}

}

const mapStateToProps = state => {
	console.log('menu.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
	};
}

//export default Menu;
export default connect(mapStateToProps)(Menu);
