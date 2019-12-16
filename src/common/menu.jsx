//import {APP_MODE} from "../common/constants"

import React, { Component } from 'react';


import { connect } from "react-redux";
import { rootStore } from "../stores/mainStore"


import App from "../components/app";
import Records from "../oabpPhoenixFailures/records";

import Trackers from "../dashboard/trackers";
import Users from "../users/users";
import TrackerConfig from "../config/trackersConfig";
import ReportsUI from "../reports/reportsui"
import SuperAdmin from "../config/superAdmin"
import LogOutIcon from "@material-ui/icons/ExitToApp"

//import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';

//import MiniDrawer from "../common/drawer";
import loginAPI from "../apicalls/loginAPI";
import CurrentUser from '../users/currentUser';
import { Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const loginAPIobj = new loginAPI();

//import Phoenix from "../oabpPhoenixFailures/records"

class Menu extends Component {
	state={
		showApp: false,
		showPh: false,
		showNewClinicAddForm: true,

		//activeClass: 
		//componentToShow: 'users',
		//componentToShow: 'superAdminUi',
		//componentToShow: "trackerConfig",
		//componentToShow: "currentUserProfile",
		componentToShow: "tickets",
	}

	render() {
		//console.log('Menu.jsx-rendering' );
		return (
			<React.Fragment >
			{ 
				this.viewMenuBar() 
			}
			<div class="" style={{margin:"0px 50px 0px 50px"}}>
			{ 
				this.renderComponent() 
			}
			</div>
			</React.Fragment>
		);
	}


	viewMenuBar(){
		return(
			<React.Fragment>
				<nav class="navbar navbar-expand-lg navbar-dark bg-primary " >
					<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="navbar-collapse collapse" id="navbarColor03" style={{margin:"0px 34px 0px 34px"}} >
						<ul class="navbar-nav mr-auto">
							<li 
								class={"nav-item "+ (this.state.componentToShow==="tickets" && "active") } 
								onClick={ ()=>{ this.setState({ componentToShow:'tickets'}) } }
							>
								<a class="nav-link" href="#" >Tickets</a>
							</li>
							{
								(
									this.props.metaData.userInfo 
									&& this.props.metaData.userInfo.user_type_id===3 //admin
								) 
								&&
								<li 
									class={"nav-item "+ (this.state.componentToShow==="trackerConfig" && "active") }
									onClick={ ()=>{ this.setState({ componentToShow:'trackerConfig'}) } } 
								>
									<a class="nav-link" href="#" >TrackerConfig</a>
								</li>
							}

							{
								(
									this.props.metaData.userInfo 
									&& this.props.metaData.userInfo.user_type_id===3 //admin
									&& this.props.metaData.userInfo.user_id===1
								) 
								&&
								<li 
									class={"nav-item "+ (this.state.componentToShow==="users" && "active") }
									style={{textTransform: "none"}}
									onClick={ ()=>{ this.setState({ componentToShow:'users'}) } } 
									//disabled={true}
									//hidden={ (this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3) }
								>
									<a class="nav-link" href="#" >UserMgt</a>
								</li>
							}

							<li 
								class={"nav-item "+ (this.state.componentToShow==="currentUserProfile" && "active") }
								onClick={ ()=>{ this.setState({ componentToShow:'currentUserProfile'}) } } 
							>
								<a class="nav-link" href="#">My Profile</a>
							</li>

							{
								(
									this.props.metaData.userInfo 
									&& this.props.metaData.userInfo.user_type_id===3 //admin
								) 
								&&
								<li 
									class={"nav-item "+ (this.state.componentToShow==="superAdminUi" && "active") }
									style={{textTransform: "none"}}
									onClick={ ()=>{ this.setState({ componentToShow:'superAdminUi'}) } } 
								>
									<a class="nav-link" href="#" >S.Admin</a>
								</li>
							}
						</ul>

						
						
						<span style={{align:'right', color:"#ffffff"}}>
							<ul class="navbar-nav mr-auto">
								<span class="nav-link" >
									User ID: { this.props.metaData.userId }
								</span>
								{/*   */}
								<span class="nav-link" >
									User Name: { (this.props.metaData.userInfo)? this.props.metaData.userInfo.email:"who you?" }
								</span>
							{/* User Name: { (this.props.metaData.userInfo)? this.props.metaData.userInfo.email:"who you?" } */}
							</ul>
						</span>
						<Button 
							style={{cursor:'pointer',float:'right',align:'right'}}
							onClick={ () => { this.logOutUser() } }
						>
							<LogOutIcon fontSize="small" />
						</Button>
					</div>
				</nav>
			</React.Fragment>
		);
	}

	componentDidMount(){ 
		//this.loadInitialData();
	}

	/** determine which compoenent to be rendered */
	renderComponent(){
		let componentToShow = this.state.componentToShow;
		if( componentToShow==="tickets" )
			return <Trackers />
		else if( componentToShow==="trackerConfig" )
			return <TrackerConfig />
		else if( componentToShow==="users" )
			return <Users />
		else if( componentToShow==="currentUserProfile" )
			return <CurrentUser />
		else if( componentToShow==="superAdminUi" )
			return <SuperAdmin />
		else if( componentToShow==="phoenixFailures" )
			return <Records />
		else if( componentToShow==="reportsUi" )
			return <ReportsUI />
		else
			return "no app";

	}

	/** make clicked componenents state value true */
	switchComponents(clickedComponent){
		console.log("menu - switchComps: ", clickedComponent);
		this.setState( { componentToShow: clickedComponent } );
	}

	/** logout user. not properly handled. should logout after receive OK from server */
	logOutUser = () => {
		loginAPIobj.logout()
		.then(
			res => {
				//console.log("menu logOutUser", res.data)
			}
		);
		
		let loggedData = {
			account_id:  localStorage.getItem("accountId") ,
			type: parseInt( localStorage.getItem("userType") ),
			user_id: parseInt( localStorage.getItem("userId") ),
		}
		this.setState({serverData: loggedData});

		localStorage.setItem("accountId", 0);
		localStorage.setItem("userType", 0);
		localStorage.setItem("userId", 0);
		localStorage.setItem("logged", "false");

		this.dispatchLogOut();
	}

	dispatchLogOut = () => {
		rootStore.dispatch({
			type: 'LOG_OUT_USER',
			payload: {
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
