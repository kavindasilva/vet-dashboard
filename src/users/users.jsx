
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

/** to be imported from constants.js */
const predefinedData=[
    { name:"admin", value:"Adminn" },
    { name:"standard", value:"STD" },
    { name:"rest", value:"Restrict" },
]

class Users extends React.Component{
    table1Columns = [
		{ title:'ID', field:'id', type: 'numeric' },
        { title:'User Name', field:'name' },
        { title:'Type', field:'type' },

        //{ title:'Type', field:'type', type:'list', render:<Table/> },
        //{ title:'Type', field:'type', render: row => <InstantInput /> },
        { title:'Type', field:'type', lookup: { admin:"Adminn", standard:"STD", rest:"Restrict" } },

        { title:'Type', field:'type', 
            editComponent: props => (
                console.log("users.jsx column props", props),
                <React.Fragment>
                </React.Fragment>
            )
        },
    ];
	state = {
        ...this.props.metaData, 
        componentToRender: "main",
        userIdToEdit: 0,
    }

	componentDidMount(){
        //console.log("Users - mount. props:", this.props); //ok
        let allUsers =userAPIObj.getUsers()
        .then(
            result => {
                let resultArr=[];
                for(var i in result.data){
                    resultArr.push( result.data[i] );
                }
                console.log("users mount2 usersArr", resultArr); // type: arr
                this.setState({allUsers: resultArr }, function(){
                    this.dispatchUsers("users")
                });
                //this.dispatchUsers()
            }
        );

        let allPartners =userAPIObj.getPartners()
        .then(
            result => {
                let resultArr=[];
                for(var i in result.data){
                    resultArr.push( result.data[i] );
                }
                console.log("users mount2 partnersArr", resultArr); // type: arr
                this.setState({allPartners: resultArr }, function(){
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
                    this.renderUserView() 
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
				<Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Type</TableCell>

                                <TableCell></TableCell>
                                <TableCell>Telephone</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                this.props.userData.map( user => (
                                    <TableRow>
                                        <TableCell>{ user.user_id }</TableCell>
                                        <TableCell>{ user.first_name+" "+user.last_name }</TableCell>
                                        <TableCell>{ user.email }</TableCell>
                                        <TableCell>{ userTypeArray[user.user_type_id] }</TableCell>
                                        
                                        <TableCell>
                                            <Button
                                                onClick={ ()=>{
                                                    this.setState({userIdToEdit: user.user_id}, function(){
                                                        this.setState({componentToRender: "editUser"})
                                                    });
                                                    
                                                } }
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>

                                        <TableCell>{ user.telephone }</TableCell>
                                    </TableRow>
                                ) )
                            }
                        </TableBody>
                    </Table>
				</Paper>
			</div>
        );
    }

    showCancelButton(){
        // return(
        //     <Button fullWidth>Cancel</Button>
        // )
    }
    
    showSaveButton(){
        // return(
        //     <Grid item xs={12}>
        //         <Button
        //             //onClick={}
        //             fullWidth
        //         >
        //             Save
        //         </Button>
        //     </Grid>
        // );
    }

    cancelForm = () => {
        this.setState({componentToRender: "main"});
    }
    

}

const mapStateToProps = state => {
	console.log('users.jsx-mapStateToProps', state);
	return {
        userData: state.UserConfigReducer.userData,
        partnerData: state.UserConfigReducer.partnerData,

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

