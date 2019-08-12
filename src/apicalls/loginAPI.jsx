//import {APP_MODE} from "../common/constants"

import React from 'react';
import axios from 'axios';


const APIlistUrl = 'http://ontrack.dev.io/api/list/DB';
const APIselectUrl = 'http://ontrack.dev.io/api/select/';

const APIauthenticateUrl = "http://ontrack.dev.io/login/user/login";
const altAPIauthenticateUrl = "http://ontrack.dev.io/api/signin";
const APIlogoutUrl = "http://ontrack.dev.io/login/user/logout";

const APIisLoggedIn = "http://ontrack.dev.io/login/user/getcurrent";

const APIrequestPasswordReset = "http://ontrack.dev.io/rest/user/requestpasswordreset"
const APIPasswordReset = "http://ontrack.dev.io/rest/user/resetpassword"
const APIforcePasswordReset = "http://ontrack.dev.io/rest/user/forceresetpassword"
const APIchangePassword = "http://ontrack.dev.io/login/user/changepassword"

class loginAPI extends React.Component {

	/**
	 * self password change function
	 * 
	 * works only for current logged in user
	 */
	changePassword(userData){
		return axios.post(APIchangePassword, userData)
			.then(
				res => {
					console.log("loginAPI.jsx - changePassword", res);
					if(res && res.status && res.status === 200)
						return { err: false }
					else
						return { err: true, errMsg: res}
				}
			)
			.catch(error => {
				console.log("loginAPI.jsx - changePassword-Err", error);
				return { errMsg:error, err: true};
			});
	}

	/**
	 * works only for admins
	 * 
	 * sample request:
	 * 	{
			"account_email":"partner0801-1131@gmail.com"
		}
	 */
	forceResetPassword(userEmail){
		return axios.post(APIforcePasswordReset, {account_email: userEmail})
			.then(
				res => {
					console.log("loginAPI.jsx - forcePasswordReset", res);
					if(res && res.status && res.status === 200)
						return { err: false }
					else
						return { err: true, errMsg: res}
				}
			)
			.catch(error => {
				console.log("loginAPI.jsx - forcePasswordReset-Err", error);
				return { errMsg:error, err: true};
			});
	}

	/**
	 * sends user email, new passwords to password reset uri
	 * 
	 * returns the response  / error to calling function
	 */
	sendPasswordResetData(userData){
		return axios.post(APIPasswordReset, userData)
			.then(
				res => {
					console.log("loginAPI.jsx - sendPasswordResetData", res);
					if(res && res.status && res.status === 200)
						return { err: false }
					else
						return { err: true, errMsg: res}
				}
			)
			.catch(error => {
				console.log("loginAPI.jsx - sendPasswordResetData-Err", error);
				return { errMsg:error, err: true};
			});
	}

	/**
	 * sends user email to password reset request uri
	 * 
	 * returns the response  / error to calling function
	 */
	requestPasswordReset(userEmail){
		return axios.post(APIrequestPasswordReset, {account_email: userEmail})
			.then(
				res => {
					console.log("loginAPI.jsx - requestPasswordReset", res);
					if(res && res.status && res.status === 200)
						return { err: false }
					else
						return { err: true, errMsg: res}
				}
			)
			.catch(error => {
				console.log("loginAPI.jsx - requestPasswordReset-Err", error);
				return { errMsg:error, err: true};
			});
	}

	logout() {
		return axios.get(APIlogoutUrl)
			.then(
				res => {
					return res
				}
			)
			.catch(error => {
				console.log("loginAPI.jsx - logout-Err", error);
				return { errMsg:error, err: true};
			});

	}

	/**
	 * checks wheher a session is existing
	 * 
	 * if session exists: {"user_id":1,"name":"Admin","email":"info@vetstoria.com","user_type_id":3}
	 * 
	 * if not 404 status is returned
	 */
	isLoggedIn(){
		return axios.get(APIisLoggedIn)
			.then( res => {
				if(res && res.data && res.data.user_id)
					return res.data;
				else
					return { errMsg:res.data, err: true};
			} )
			.catch(error => {
				console.log("loginAPI.jsx - isLoggedIn-Err", error);
				return { errMsg:error, err: true};
			});
	}

	authenticate(username, password, otp) {
		let data = {};
		data = {
			"account_email": username,
			"account_password": password,
			"is_otp_required": true,
			"otp": otp
		};

		console.log("loginAPI - authenticate", data);

		return axios.post(
			APIauthenticateUrl,
			//altAPIauthenticateUrl, 

			data,

			{
				headers: {
					'Content-Type': 'application/json',
				}
			}
		)
			.then(res => {
				console.log("loginAPI - axios reponse:", res);
				console.log(res.data);
				return res;
			})
			.catch(error => {
				console.log("loginAPI.jsx - axios-Err", error);
				return { errMsg:error, err: true};
			  });

		//sample response
		//{"type":3,"account_id":"1","user_id":2}


	}

	/** send authentication data to API. currently not initialized API */
	authenticateAPI(data0) {
		let data = {
			"account_email": "ks@vetstoria.com",
			"account_password": "123",
			"is_otp_required": true,
			"otp": "qaauto"
		};

		data = JSON.parse(" { \"account_email\": \"ks@vetstoria.com\", \"account_password\": \"123\", \"is_otp_required\": true, \"otp\": \"qaauto\" } ");
		console.log("loginAPI - authenticateAPI", data);

		axios.post(APIauthenticateUrl, data, { method: 'post' })
			.then((res) => {
				console.log("loginAPI - axios reponse:", res);
				console.log(res.data);
				return res.data[0];
			})

		// sample response
		// {"type":3,"account_id":"1","user_id":2}
	}

}

export default loginAPI;