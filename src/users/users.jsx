//import {APP_MODE} from "../common/constants"
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
import Button from 'react-bootstrap/Button';

//import { userTypeArray } from "../common/constants";

import userAPI from "../apicalls/userAPI"
import loginAPI from '../apicalls/loginAPI';

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

/** to be imported from constants.js */
const predefinedData=[
    { name:"admin", value:"Adminn" },
    { name:"standard", value:"STD" },
    { name:"rest", value:"Restrict" },
]

class Users extends React.Component{
	state = {
        ...this.props.metaData, 
        componentToRender: "main",
        userIdToEdit: 0,

        errorGetUsers: false,
        errorMsgGetUsers: false,
    }
    propStyle = this.props.classes;

    /**
     * retrieve users in from the database
     */
	componentDidMount(){
        userAPIObj.getUsers()
        .then(
            result => {
                if(result && result.err){
                    console.log("users - gettingUsers err", result);
                    this.setState({
                        errorGetUsers: true,
                        errorMsgGetUsers: result.errMsg.toString()
                    });
                    return;
                }
                let resultArr=[];
                for(var i in result.data){
                    resultArr.push( result.data[i] );
                }
                console.log("users mount2 usersArr", resultArr); // type: arr
                this.setState({allUsers: resultArr }, function(){
                    this.dispatchUsers("users")
                });
            }
        )

        userAPIObj.getPartners()
        .then(
            result => {
                if(result && result.err){
                    console.log("partners - gettingUsers err", result);
                    return;
                }
                console.log("partners mount2 usersArr", result); // type: arr
                this.setState({allPartners: result.data }, function(){
                    this.dispatchUsers("partners")
                });
            }
        )
        
		//console.log("Users - mount. props.metaData:", this.props.metaData); 
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
                
                {
                    (this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3)
                    ? <div>You are not authorixed to view this page</div>
                    : this.renderUserView()
                }
			</React.Fragment>
		)
    }

    dispatchUsers = ( type ) => {
        switch(type){
            case "users":
                rootStore.dispatch({
                    type: 'GET_SYSTEM_USERS',
                    payload: {
                        userData: this.state.allUsers
                    }
                });
                break;

            case "partners":
                rootStore.dispatch({
                    type: 'GET_SYSTEM_PARTNERS',
                    payload: {
                        partnerData: this.state.allPartners
                    }
                });
                break;

            default:
                console.log("users dispatch unknown type: ", type);
        }
    }

    renderUserView(){
        switch(this.state.componentToRender){
            case "main":
                return(
                    <React.Fragment>
                        { this.newUserButton() }
                        { this.viewUsers() }
                        
                    </React.Fragment>
                );
            
            case "newUserForm":
                return(
                    <React.Fragment>
                        <NewUser cancelForm={ this.cancelForm } />
                        { this.showSaveButton() }
                        { this.showCancelButton() }
                    </React.Fragment>
                );
            
            case "editUser":
                return(
                    <React.Fragment>
                        <EditUser 
                            userId={ this.state.userIdToEdit } 
                            cancelForm={ this.cancelForm }
                        />
                        { this.showSaveButton() }
                        { this.showCancelButton() }
                    </React.Fragment>
                );

            default:
                console.log("users.jsx renderUserView default", this.state.componentToRender);
        }
    }

    newUserButton(){
        return(
            <Button  
                style={ { width: "100%" } }
                onClick={ () => this.setState({ componentToRender: "newUserForm" }) }
            >
                New User
            </Button>
        )
    }

	viewUsers(){
		return(
			<div className="container">
				<Paper style={{overflowX: 'auto'}} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={this.propStyle.head}>User ID</TableCell>
                                <TableCell className={this.propStyle.head}>Name</TableCell>
                                <TableCell className={this.propStyle.head}>Email</TableCell>
                                <TableCell className={this.propStyle.head}>Type</TableCell>

                                <TableCell className={this.propStyle.head}></TableCell>
                                <TableCell className={this.propStyle.head}>Telephone</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                (this.props.userData && !this.state.errorGetUsers)
                                ? this.props.userData.map( user => (
                                    <TableRow key={ user.user_id }>
                                        <TableCell>{ user.user_id }</TableCell>
                                        <TableCell>{ user.first_name+" "+user.last_name }</TableCell>
                                        <TableCell>{ user.email }</TableCell>
                                        <TableCell>
                                        { //userTypeArray[user.user_type_id] 
                                         
                                            (this.props.partnerList && this.props.partnerList.length>0 )
                                            ?    /** show user type */
                                                (   
                                                    this.props.partnerList.find( partner => (
                                                        partner.partner_id === user.account_id
                                                    ) )
                                                )
                                                ? this.props.partnerList.find( partner => (
                                                    partner.partner_id === user.account_id
                                                ) ).name
                                                : "not found"
                                            : "loading.."
                                        
                                        }</TableCell>
                                        
                                        <TableCell>
                                            <Button
                                                onClick={ ()=>{
                                                    this.setState({userIdToEdit: user.user_id}, function(){
                                                        this.setState({componentToRender: "editUser"})
                                                    });
                                                    
                                                } }
                                                variant="outline-primary"
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                onClick={ ()=>{
                                                    this.forceResetPassword( user.email.toString() )
                                                } }
                                                variant="outline-warning"
                                            >
                                                ResetPass
                                            </Button>

                                        </TableCell>

                                        <TableCell>{ user.telephone }</TableCell>
                                    </TableRow>
                                ) )
                                : (
                                    (this.state.errorGetUsers)
                                    ? <React.Fragment>
                                        <TableRow>
                                            <TableCell colSpan="4">Data loading Error</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan="4">
                                                { this.state.errorMsgGetUsers.toString() }
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                    : <TableRow>
                                        <TableCell colSpan="4">Loading</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
				</Paper>
			</div>
        );
    }

    cancelForm = () => {
        this.setState({componentToRender: "main"});
    }

    /**
     * call force password reset
     * 
     * works only for admins
     */
    forceResetPassword = ( email ) => {
        loginAPIObj.forceResetPassword(email)
        .then(
			res => {
                console.log("users.jsx forceResetPassword ", res)
                if( res && res.data){
                    // make a notification. need to re-fetch data??
				}
			}
		)
    }

    showCancelButton = () => (
        <React.Fragment></React.Fragment>
    )
    showSaveButton = () => (
        <React.Fragment></React.Fragment>
    )

}

const mapStateToProps = state => {
	console.log('users.jsx-mapStateToProps', state);
	return {
        metaData: state.MetaReducer.metaData,
        userData: state.UserConfigReducer.userData,
        partnerList: state.UserConfigReducer.partnerData,

	};
}

//export default Users;
//export default connect(mapStateToProps)(Users);
export default connect(mapStateToProps)(withStyles(styles)(Users));

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

