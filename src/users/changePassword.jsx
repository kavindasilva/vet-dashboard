//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';


import userAPI from "../apicalls/userAPI"
import loginAPI from '../apicalls/loginAPI';
import { ServerResponse } from 'http';

const userAPIObj = new userAPI();
const loginAPIObj = new loginAPI();

const styles = theme => ({
	root: {
	  width: "100%",
	  marginTop: theme.spacing.unit * 3,
	  overflowX: "auto"
	},
	head: {
	  backgroundColor: "#eee",
	  position: "sticky",
	  top: 0
	}
});


class ChangePassword extends React.Component{
	state = {
        ...this.props.metaData,

        current_password: "",
        new_password_1: "",
        new_password_2: "",
     
        serverMsg: "",
		viewMsg: false,
		msgHasError: true,
    }

	render(){
        //if(this.props.currentUserData)console.log("changePassword render", this.props.currentUserData)
		return(
			<React.Fragment>    
            {
                this.viewPasswordChangeUI() 
            }
			</React.Fragment>
		)
    }

    /**
     * sends data to API and gets reponse
     */
    handlePasswordChanging = () => {
        let data = {
            old_password: this.state.current_password,
            new_password_1: this.state.new_password_1,
            new_password_2: this.state.new_password_2
        }

        loginAPIObj.changePassword( data )
        .then(
            serverResponse => {
                if(serverResponse.err && serverResponse.errMsg && serverResponse.errMsg.response
                    && serverResponse.errMsg.response.headers 
                    && serverResponse.errMsg.response.headers["x-status-reason"]
                ){
                    this.setState({
                        serverMsg: serverResponse.errMsg.response.headers["x-status-reason"].toString(),
                        msgHasError: true,
                    });
                    console.log("changePassword - changePassword fail reason:", serverResponse.errMsg.response.headers["x-status-reason"])
                }
                else if(serverResponse.err)
                    this.setState({
                        serverMsg: serverResponse.errMsg.toString(),
                        msgHasError: true,
                    })
                else
                    this.setState({
                        serverMsg: "Password changed successfully",
                        msgHasError: false,
                    })
                
                this.setState({viewMsg: true})
                console.log("changePassword - handlePasswordChaning", serverResponse)
            }
        )
    }

    viewPasswordChangeUI(){
        return(
            <React.Fragment>
                <Table>
                    <TableHead>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Current Password</TableCell>
                            <TableCell>
                                <TextField
                                    //type={"password"}
                                    value={ this.state.current_password }
                                    onChange={ (e)=>this.setState({current_password: e.target.value}) }
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>New Password</TableCell>
                            <TableCell>
                                <TextField
                                    //type={"password"}
                                    value={ this.state.new_password_1 }
                                    onChange={ (e)=>this.setState({new_password_1: e.target.value}) }
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Confirm Password</TableCell>
                            <TableCell>
                                <TextField
                                    //type={"password"}
                                    value={ this.state.new_password_2 }
                                    onChange={ (e)=>this.setState({new_password_2: e.target.value}) }
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Button
                                    onClick={ ()=>this.props.goBack() }
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={ ()=>this.handlePasswordChanging() }
                                >
                                    Change Password
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                    
                </Table>
                <Snackbar
                    open={ this.state.viewMsg }
                    aria-describedby="client-snackbar"
                    message={ 
                        <span
                            style={ (this.state.msgHasError)?{color:"red"}:{color:"green"}}
                        >
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
            </React.Fragment>
        );
				
    }

    
    

}

const mapStateToProps = state => {
    console.log('changePassword.jsx-mapStateToProps', state);
    //let meta = state.MetaReducer.metaData;
	return {
        metaData: state.MetaReducer.metaData,
        // currentUserData: state.UserConfigReducer.userData.find( user => (
        //     user.user_id == state.MetaReducer.metaData.userId
        //     //user.user_id === 5
        // ) ),
	};
}

//export default ChangePassword;
//export default connect(mapStateToProps)(ChangePassword);
export default connect(mapStateToProps)(withStyles(styles)(ChangePassword));

/** sample json Request */
/*[
    {
	"account_email0":"does not want",
	"account_email2":"works only for current logged user",
	
    "old_password":"123",
    "new_password_1":"1234",
    "new_password_2":"1234"
}
]*/

