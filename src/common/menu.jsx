

import React, { Component } from 'react';


import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore"


import App from "../components/app";
import Records from "../phoenix/records";
import Pets from "../components/pets";

import Trackers from "../dashboard/trackers";
import Users from "../users/users";
import TrackerConfig from "../config/trackersConfig";

import Button from '@material-ui/core/Button';

import MiniDrawer from "../common/drawer";

//import Phoenix from "../phoenix/records"

class Menu extends Component {
	state={
		showApp: false,
		showPh: false,

		//componentToShow: 'def',
		componentToShow: "config",
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
			<React.Fragment>
				{/* <MiniDrawer /> */}
				
				{ /** temporary menu bar */ }
				<div>
					<div>
					Hi user ID: ... { this.props.metaData.userId } ...
						<Button style={{cursor:'pointer',float:'right',align:'right'}}
							onClick={ () => { this.logOutUser() } }
						>
							LogOut
						</Button> <hr />
					</div>

					Temporary menu bar: 
					<Button onClick={ ()=>{ this.setState({ componentToShow:'tickets'}) } } >Tickets</Button>
					<Button onClick={ ()=>{ this.setState({ componentToShow:'config'}) } } >TrackerConfig</Button>
					<Button onClick={ ()=>{ this.setState({ componentToShow:'users'}) } } >UserMgt</Button>
				</div>
				{/*  */}
				
			</React.Fragment>
		);
	}

	componentDidMount(){ 
		//this.loadInitialData();
	}

	/** determine which compoenent to be rendered */
	componentToShow(){
		let componentToShow = this.state.componentToShow;
		if( componentToShow=="tickets" )
			return <Trackers />
		if( componentToShow=="config" )
			return <TrackerConfig />
		else if( componentToShow=="users" )
			return <Users />
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
		let loggedData = {
			account_id:  localStorage.getItem("accountId") ,
			type: parseInt( localStorage.getItem("userType") ),
			user_id: parseInt( localStorage.getItem("userId") ),
		}
		this.setState({serverData: loggedData});

		localStorage.setItem("accountId", 0);
		localStorage.setItem("userType", 0);
		localStorage.setItem("userId", 0);

		this.dispatchLogOut();
	}

	dispatchLogOut = () => {
		rootStore.dispatch({
			type: 'UPDATE_META_DETAIL',
			payload: {
				loggedData: {...this.state.serverData, isLoggedIn: false }
			}
		});
	}

}

const mapStateToProps = state => {
	//console.log('menu.jsx-mapStateToProps', state);
	return {
		metaData: state.MetaReducer.metaData,
	};
}

//export default Menu;
export default connect(mapStateToProps)(Menu);
