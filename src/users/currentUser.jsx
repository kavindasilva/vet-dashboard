import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';
import Menu from "../common/menu";
//import InstantInput from "../users/instantInput";

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

import NewUser from "../users/newUser";
import EditUser from "../users/editUser";
import { Button } from '@material-ui/core';
import ChangePassword from "../users/changePassword"

import { userTypeArray } from "../common/constants";

import userAPI from "../apicalls/userAPI"
const userAPIObj = new userAPI();

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


class CurrentUser extends React.Component{
	state = {
        ...this.props.metaData, 
        componentToShow: "profile",
    }

	render(){
		return(
			<React.Fragment>    
            {
                this.handleUserProfile() 
            }
			</React.Fragment>
		)
    }

    handleUserProfile = () => {
        if(this.state.componentToShow === "profile")
            return this.viewProfile();
        else if(this.state.componentToShow === "passwordChange")
            return(
                <ChangePassword
                    goBack={ ()=>this.setState({componentToShow: "profile"}) }
                />
            );
    }

    /**
     * function1: get current session's user details and update state
     */
    componentDidMount(){
        userAPIObj.getSingleUser(this.props.metaData.userId)
        .then(
            result => {
                this.setState({currentUserData: result.data });
            }
        );
		//if(APP_MODE==="DEBUG")console.log("CurrentUser - mount. props.metaData:", this.props.metaData); 
	}

    viewProfile(){ //return(<div></div>);
        let userColumns = this.state.currentUserData;
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Property</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {/* {
                    (userColumns)?
                    Object.keys(userColumns).map( (key, i) => (
                        <TableRow key={i}>
                            <TableCell></TableCell>
                            <TableCell>{ key.toString() }</TableCell>
                            <TableCell>{ JSON.stringify(userColumns[key]) }</TableCell>
                        </TableRow>
                    ) )
                    :<TableRow>
                        <TableCell colSpan={3}>Loading...</TableCell>
                    </TableRow>
                } */}

                {
                    (userColumns)?
                    <React.Fragment>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>User ID</TableCell>
                        <TableCell>{ (userColumns["user_id"]) && userColumns["user_id"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>{ (userTypeArray[userColumns["user_type_id"]]) && userTypeArray[userColumns["user_type_id"].toString()] }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Account</TableCell>
                        <TableCell>{ (userColumns["account"]) && userColumns["account"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>{ (userColumns["email"]) && userColumns["email"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Telephone</TableCell>
                        <TableCell>{ (userColumns["telephone"]) && userColumns["telephone"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>{ (userColumns["first_name"]) && userColumns["first_name"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>{ (userColumns["last_name"]) && userColumns["last_name"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Password Expire Time</TableCell>
                        <TableCell>{ (userColumns["password_expiry_time"]) && userColumns["password_expiry_time"].toString() }</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>
                            <Button
                                onClick={ ()=>this.setState({componentToShow: "passwordChange"}) }
                            >
                                Change password
                            </Button>
                        </TableCell>
                    </TableRow>
                    </React.Fragment>
                    : <TableRow>
                        <TableCell colSpan={3}>Loading...</TableCell>
                    </TableRow>
                }
                </TableBody>
                
            </Table>
        );
				
    }
    

}

const mapStateToProps = state => {
    if(APP_MODE==="DEBUG")console.log('currentUser.jsx-mapStateToProps', state);
    //let meta = state.MetaReducer.metaData;
	return {
        metaData: state.MetaReducer.metaData,
        currentUserData: state.UserConfigReducer.userData.find( user => (
            user.user_id == state.MetaReducer.metaData.userId
            //user.user_id === 5
        ) ),
	};
}

//export default CurrentUser;
//export default connect(mapStateToProps)(CurrentUser);
export default connect(mapStateToProps)(withStyles(styles)(CurrentUser));

/** sample json response */
/*[
    {
        "user_id": "1",
        "user_type_id": "3",
        "restriction_id": null,
        "account_id": "1",
        "email": "info@vetstoria.com",
        "telephone": "+447912945190",
        "password": null,
        "first_name": "Admin",
        "last_name": "",
        "salt": null,
        "password_reset_token": null,
        "password_reset_expiry": null,
        "password_hash": "67b73c60749ced9c1ebcaf1378fccb23",
        "ismd5": "1",
        "auth_type": "1",
        "auth_key": null,
        "handedover_time": "2019-06-07 07:17:11",
        "created_time": "2019-06-07 07:17:11",
        "is_primary_user": "1",
        "organization_label": null,
        "zendesk_id": null,
        "zendesk_tags": null,
        "deleted": "0",
        "is_anonymized": "0",
        "msa_agreed_on": null,
        "is_msa_agreement_required": "0",
        "password_expiry_time": "2029-06-10 07:00:00",
        "password_algorithm": "1",
        "localise_views": "0"
    },
]*/

