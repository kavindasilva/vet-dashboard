//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Menu from "../common/menu";
import PasswordResetRequestForm from "../common/passwordResetRequest"

import loginAPI from "../apicalls/loginAPI";
import userAPI from "../apicalls/userAPI";

import Trackers from "../dashboard/trackers";
import { FormLabel, SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
//import MiniDrawer from "../common/drawer";

const loginAPIobj = new loginAPI();
const userAPIobj = new userAPI();



const useStyles = theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

//export default class Login{
class Login extends React.Component{

	classes=this.props.classes;

	state = { 
		otp:"qaauto", 
		username:"info@vetstoria.com", 
		password:"123",
		serverData: { account_id:0, type:0, user_id:0},

		componentToShow:"", // except login form and menu bar

		authFailed: false,
		authFailedMsg: "",
	}

	/**
	 * handle php session checking and redirecting logged user in some events
	 * ex: page refresh
	 */
	componentDidMount(){
		//console.log("Login - mount. classes:", this.classes);
		loginAPIobj.isLoggedIn()
		.then(
			res => {
				console.log("login - mount - isloggedIn", res);
				if(!res.err && res.user_id){
					let validatedServerResponse={
						account_id: res.account_id, 
						type:res.user_type_id, 
						user_id:res.user_id
					}
					this.setState({serverData: validatedServerResponse}, ()=>{
						this.getLoggedUserData( this.state.serverData.user_id )
					});
				}
				else{
					rootStore.dispatch({
						type: 'LOG_OUT_USER'
					})
				}
			}
		)
	}

	render(){
		return(
			<React.Fragment>
			{ 
				this.handleLoginStatus()	
			}
			</React.Fragment>
		)
	}

	getFormData = (event)=> {
		console.log("Login - formData:",event);
	}

	sendCredentials = () => {
		console.log("Login - credentials:", this.state.username, this.state.password );
		
		// call to API post
		loginAPIobj.authenticate(this.state.username, this.state.password, this.state.otp)
			.then( res => {
				console.log("Login - authMsg:", res);
				this.validateCredentials(res);
			});
		//console.log("Login - authMsg:", authMsg);
	}

	/** 
	 * Validate credentials and authorize 
	 * if credentials wrong : data: "Bad Request"
	 * if credentials validated: data: {type: 3, account_id: "1", user_id: 2}
	*/
	validateCredentials( serverData){
		if(  serverData.data
			&& serverData.data.type !=="" 
			&& serverData.data.type!==null 
			&& serverData.data!=="Bad Request" 

			&& serverData.data.user_id
			&& serverData.data.type
			&& serverData.data.account_id
		){
			console.log("credentials validated. serverData:", serverData);
			this.setState({serverData: serverData.data}, () => {

				/** temporary. needs to add security token from backend */
				localStorage.setItem( "logged", "true" );
				localStorage.setItem( "userId", serverData.data.user_id );
				localStorage.setItem( "userType", serverData.data.type );
				localStorage.setItem( "accountId", serverData.data.account_id );

				//this.dispatchLogin();
				this.getLoggedUserData( serverData.data.user_id )
			});
			
			//this.setState({isLoggedIn: true});
		}
		else if(serverData.err && serverData.errMsg && serverData.errMsg.response
			&& serverData.errMsg.response.headers 
			&& serverData.errMsg.response.headers["x-status-reason"]
		){
			this.setState({
				authFailedMsg: serverData.errMsg.response.headers["x-status-reason"].toString(),
				authFailed: true,
			});
		}
		else if( serverData.err || serverData.data =="Bad Request" ){
			this.setState({authFailed: true});
			this.setState({authFailedMsg: serverData.errMsg.toString() });
			console.log("credentials not validated", serverData);
		}
		else{
			console.log("credential validation error. unnknown condition" );
		}
	}

	/** 
	 * Display login if user not logged in.
	 * Display Menu bar if user logged in.
	 */
	handleLoginStatus(){
		//console.log('login.jsx - handleLoginStatus', localStorage.getItem("logged")==='true', localStorage.getItem("userId"));
		if(this.props.metaData.isLoggedIn===true){
			return this.viewMenu();
		}
		// this part is only for testing in port 3000. comment in production
		else if( localStorage.getItem("logged")==="true" && localStorage.getItem("userId")!=="0" ){
			let loggedData = {
				account_id:  localStorage.getItem("accountId") ,
				type: parseInt( localStorage.getItem("userType") ),
				user_id: parseInt( localStorage.getItem("userId") ),
			}
			console.log('login.jsx - handleForm1', loggedData );

			this.setState({serverData: loggedData}, function(){
				console.log('login.jsx - handleForm2', this.state.serverData );
				//this.dispatchLogin();
				this.getLoggedUserData( this.state.serverData.user_id )
			});
		}
		else if(this.state.componentToShow === "requestReset"){
			return(
				<PasswordResetRequestForm 
					goBack={ ()=>this.setState({componentToShow:"other"}) }
				/>
			);
		}
		else{
			return this.viewLoginForm();
		}
	}

	/** Call Menu bar rendering component */
	viewMenu(){
		return(
			<Menu />
		)
	}

	/** update the redux store after successful login */
	dispatchLogin = ( userDbData=null ) => {
		rootStore.dispatch({
			type: 'LOG_IN_USER',
			payload: {
				loggedData: { ...this.state.serverData, isLoggedIn: true },
				dbData: userDbData
			}
		});
		console.log('login.jsx - dispatchLogin', { ...this.state.serverData, isLoggedIn: true } );
	}

	/** get other user information like name,email,... from db, and update store */
	getLoggedUserData( userId ){ 
		this.dispatchLogin(null); //return; // without this code infinite loop occurs
		userAPIobj.getSingleUser(userId)
		.then(
			res => {
				if( res && res.data){
					console.log("login.jsx loggedUserDbInfo ", res)
					this.dispatchLogin(res.data);
				}
			}
		)
	}

	/** render the login form */
	viewLoginForm(){
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>

					<form className={this.classes.form} 
						//noValidate={ true } 
						onSubmit={ this.getFormData }
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange = { (e)=>{ this.setState({username: e.target.value}) } }
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange = { (e)=>{ this.setState({password: e.target.value}) } }
							//autoComplete="current-password"
						/>

						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="otp"
							label="otp"
							type="otp"
							id="otp"
							value={ this.state.otp }
							onChange = { (e)=>{ this.setState({otp: e.target.value}) } }
							//autoComplete=""
						/>
						
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={this.classes.submit}
							onClick={ this.sendCredentials }
						>
							Sign In
						</Button>

						<Snackbar
							open={ this.state.authFailed }
							aria-describedby="client-snackbar"
							message={ 
								<span style={{color:"red"}}>
									{ this.state.authFailedMsg }
								</span>
							}
							action={[
								<IconButton 
									key="close" 
									aria-label="close" 
									color="inherit" 
									onClick={ ()=>this.setState({authFailed: false}) }
								>
									x
								</IconButton>,
							]}
							
						/>

						<Grid container>
							<Grid item xs>
								<Link 
									href="#" variant="body2"
									onClick={ ()=>this.setState({componentToShow:"requestReset"}) }
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link 
									href="#" variant="body2"
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					
				</Box>
			</Container>
		);
	}

}

const mapStateToProps = state => {
	console.log('login.jsx-mapStateToProps', state);
	return {
		//metaData: state.metaData,
		metaData: state.MetaReducer.metaData,
	};
}

//export default connect(mapStateToProps)(withStyles(useStyles)(Login));
export default connect(mapStateToProps)(withStyles(useStyles)(Login));

