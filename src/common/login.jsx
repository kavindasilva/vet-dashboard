
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { petStore } from "../stores/pets";

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
import loginAPI from "../apicalls/loginAPI";

const loginAPIobj = new loginAPI();



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

//const classes = useStyles();

//export default class Login{
class Login extends React.Component{

	classes=this.props.classes;

	state = { ...this.props.metaData, otp:"qaauto" }
	//state = { Meta }

	componentDidMount(){
		//console.log("Login - mount. classes:", this.classes);
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
				{ this.viewMenu() }
			</React.Fragment>
		)
	}
	//const classes = useStyles();

	getFormData = (event)=> {
		console.log("Login - formData:",event);
	}

	sendCredentials = () => {
		console.log("Login - credentials:", this.state.username, this.state.password );
		
		// call to API post
		loginAPIobj.auth3(this.state.username, this.state.password, this.state.otp)
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
	//validateCredentials( userInput, serverData)
	validateCredentials( serverData){
		if( serverData.data.type !=="" && serverData.data.type!==null && serverData.data!=="Bad Request" ){
		//if( parseInt(serverData.ticket_id)===28868823 ){
			console.log("credentials validated. serverData:", serverData);
			this.setState({serverData: serverData.data});

			this.dispatchLogin();
			//this.setState({isLoggedIn: true});
		}
		else if( serverData.data =="Bad Request" ){
			console.log("credentials not validated");
		}
		else{
			console.log("credential validation error" );
		}
	}

	/** 
	 * Display login if user not logged in.
	 * Display Menu bar if user logged in.
	 */
	viewForm(){
		console.log('login.jsx - viewForm', this.props);
		if(this.props.metaData.isLoggedIn===true){
			return this.viewMenu();
		}
		else{
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
								//onClick={ this.getFormData }
								onClick={ this.sendCredentials }
							>
								Sign In
							</Button>

							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
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

	/** Call Menu bar rendering component */
	viewMenu(){
		return(
			<Menu />
		)
	}

	/** This function is not used */
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

	dispatchLogin = () => {
		petStore.dispatch({
			type: 'UPDATE_META_DETAIL',
			payload: {
				//isLoggedIn: false,
				//userID: 250
				loggedData: {...this.state.serverData, isLoggedIn: true }
			}
		});
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

