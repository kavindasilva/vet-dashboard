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

					<div class="navbar-collapse collapse" id="navbarColor03">
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

						<span style={{align:'right'}}>
							Hi user ID: ... { this.props.metaData.userId } ...  
							{ (this.props.metaData.userInfo)? this.props.metaData.userInfo.email:"who you?" }
						</span>
						<Button 
							style={{cursor:'pointer',float:'right',align:'right'}}
							onClick={ () => { this.logOutUser() } }
						>
							Log Out
						</Button>
					</div>
				</nav>
			</React.Fragment>
		);
	}

	/**
	 * renders the menu bar (temporary menu bar)
	 */
	viewMenuBar2(){
		return(
			<React.Fragment>
				{/* <MiniDrawer /> */}
				
				{ /** temporary menu bar */ }
				<div style={{backgroundColor:"#f1f2f3", textTransform: "none"}}>
					{/* <Link onClick={()=>this.setState({componentToShow:"phoenixFailures"})}>phoenixAPI</Link> */}
					<div>
					Hi user ID: ... { this.props.metaData.userId } ...  
					{ (this.props.metaData.userInfo)? this.props.metaData.userInfo.email:"who you?" }
						<Button 
							style={{cursor:'pointer',float:'right',align:'right'}}
							onClick={ () => { this.logOutUser() } }
						>
							LogOut
						</Button> <hr />
					</div>

					Temporary menu bar: 
					
					<Button 
						style={{textTransform: "none"}}
						onClick={ ()=>{ this.setState({ componentToShow:'tickets'}) } } 
					>
						Tickets
					</Button>
					
					{
						(
							this.props.metaData.userInfo 
							&& this.props.metaData.userInfo.user_type_id===3 //admin
						) 
						&&
						<Button 
							style={{textTransform: "none"}}
							onClick={ ()=>{ this.setState({ componentToShow:'trackerConfig'}) } } 
						>
							TrackerConfig
						</Button>
					}

					{
						(
							this.props.metaData.userInfo 
							&& this.props.metaData.userInfo.user_type_id===3 //admin
						) 
						&&
						<Button 
							style={{textTransform: "none"}}
							onClick={ ()=>{ this.setState({ componentToShow:'users'}) } } 
							//disabled={true}
							hidden={true}
							//hidden={ (this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3) }
						>
							UserMgt
						</Button>
					}

					<Button 
						style={{textTransform: "none"}}
						onClick={ ()=>{ this.setState({ componentToShow:'currentUserProfile'}) } } 
					>
						My profile
					</Button>

					{/* {
						(
							this.props.metaData.userInfo 
							&& this.props.metaData.userInfo.user_type_id===3 // --check for all auth users
						) 
						&&
						<Button 
							onClick={ ()=> this.setState({ componentToShow: 'reportsUi' }) } 
						>
							Reports
						</Button>
					} */}

				</div>
				{/*  */}
				
			</React.Fragment>
		);
	}

	/**
	 * shows the new New clinic adding form in a popup dialog
	 */
	showNewClinicForm = () => (
		<Dialog
			open={this.state.showNewClinicAddForm}
			onClose={this.closeNewClinicForm}
			aria-labelledby="draggable-dialog-title"
		>
			{/* <AppBar position="relative" ></AppBar> */}
			<DialogTitle id="draggable-dialog-title" 
			style={
				{ ...this.styleMatUI.titleBarPrimary,  padding: "18px 24px 16px 24px" }
			}
			>

				Change { this.state.attributeName }

			</DialogTitle>

			<DialogContent>

				
			</DialogContent>

			<DialogActions>
				<Button onClick={ ()=>{
						this.setState({ attributeValue: this.props.value });
						this.closeNewClinicForm() 
					} }
					style={ this.styleMatUI.closeButton }	
					variant="text"
					color="primary"
				>
					Cancel
				</Button>
									
				<Button onClick={ () => { 
						//this.setState({ attributeValue:this.state.attributeValue });
						this.dispatchUpdate()
						this.closeNewClinicForm(); 
					} } 
					variant="text" color="primary"
					style={this.styleMatUI.closeButton} >OK
				</Button>

				
			</DialogActions>
		</Dialog>
	)

	closeNewClinicForm = () => {
		this.setState({showNewClinicAddForm: false});
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
