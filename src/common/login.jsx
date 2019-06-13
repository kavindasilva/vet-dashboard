
import React from 'react';
import { connect } from "react-redux";

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

	/**
	 * JSON output
	 * action_id
	 * user_id
	 */
	state = {
		username: '',
		password: '',
		otp: '',

		isLoggedIn: false,
	}

	componentDidMount(){
		//console.log("Login - mount. classes:", this.classes);
	}

	render(){
		return(
			<React.Fragment>
				{ this.viewForm() }
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
		//let authMsg = loginAPIobj.authenticateAPI(null)
		//loginAPIobj.authenticateAPI(null)
		//loginAPIobj.auth2(null)
		loginAPIobj.auth3(this.state.username, this.state.password, this.state.otp)
			.then( res => {
				console.log("Login - authMsg:", res);
				this.validateCredentials(res);
			});
		//console.log("Login - authMsg:", authMsg);
	}

	/** validate credentials and authorize 
	 *  if credentials wrong : data: "Bad Request"
	 * if credentials validated: data: {type: 3, account_id: "1", user_id: 2}
	*/
	//validateCredentials( userInput, serverData)
	validateCredentials( serverData){
		if( serverData.data.type !=="" && serverData.data.type!==null && serverData.data!=="Bad Request" ){
		//if( parseInt(serverData.ticket_id)===28868823 ){
			console.log("credentials validated");
			this.setState({isLoggedIn: true});
		}
		else if( serverData.data =="Bad Request" ){
			console.log("credentials not validated");
		}
		else{
			console.log("credential validation error" );
		}
	}

	viewForm(){
		if(this.state.isLoggedIn===true){
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
								onChange = { (e)=>{ this.setState({otp: e.target.value}) } }
								//autoComplete="current-password"
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

	viewMenu(){
		return(
			<Menu />
		)
	}

}

//export default Login;
//export default withStyles(useStyles)(Login);

const mapStateToProps = state => {
	console.log('login.jsx-mapStateToProps', state);
	return {
		admissions: state.admissions,
		tickets: state.tickets,
		metaData: state.metaData
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(Login));

