
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

//export default class PasswordResetRequestForm{
class PasswordResetRequestForm extends React.Component{

	classes=this.props.classes;

	state = { 
		componentToShow: "resetRequestForm",
		userEmail: "",

		serverMsg: "",
		viewMsg: false,
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

	handleLoginStatus(){
		if(this.state.componentToShow === "resetRequestForm")
			return this.viewPasswordResetRequestForm();
		else if(this.state.componentToShow === "enterResetCode")
			return this.viewPasswordResetForm();
	}


	/** renders the password reset code entering form */
	viewPasswordResetForm(){
		return(
			<React.Fragment></React.Fragment>
		)
	}


	/** renders the password reset request form */
	viewPasswordResetRequestForm(){
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Reset Password
					</Typography>

					<form className={this.classes.form} 
						//noValidate={ true } 
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							value={ this.state.userEmail }
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange = { (e)=>{ this.setState({userEmail: e.target.value}) } }
							autoFocus
						/>
						
						<Button
							type="button"
							fullWidth
							variant="contained"
							color="primary"
							className={this.classes.submit}
							onClick={ this.sendCredentials }
						>
							Send Code
						</Button>

						<Snackbar
							open={ this.state.viewMsg }
							aria-describedby="client-snackbar"
							message={ 
								<span style={{color:"red"}}>
									{ this.state.serverMsg }
								</span>
							}
							action={[
								<IconButton 
									key="close" 
									aria-label="close" 
									color="inherit" 
									onClick={ ()=>this.setState({viewMsg: false}) }
								>
									x
								</IconButton>,
							]}
							
						/>

						<Grid container>
							<Grid item xs>
								<Link 
									href="#" variant="body2"
									onClick={ ()=>this.props.goBack() }
								>
									Go back to Login
								</Link>
							</Grid>
							<Grid item>
								<Link 
									href="#" variant="body2" 
									onClick={ ()=>this.setState({componentToShow:"enterResetCode"}) }
								>
									Enter Reset code
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
	return {
		metaData: state.MetaReducer.metaData,
	};
}

export default connect(mapStateToProps)(withStyles(useStyles)(PasswordResetRequestForm));
//export default connect(mapStateToProps)(PasswordResetRequestForm);

