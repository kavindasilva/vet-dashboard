
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


class CurrentUser extends React.Component{
	state = {
        ...this.props.metaData, 
    }

	componentDidMount2(){
        if(this.props.metaData.userInfo && this.props.metaData.userInfo.user_type_id!==3)
            return;
        //console.log("CurrentUser - mount. props:", this.props); //ok
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
        
        
		//console.log("CurrentUser - mount. props.metaData:", this.props.metaData); 
	}

	render(){
        //if(this.props.currentUserData)console.log("currentUser render", this.props.currentUserData)
		return(
			<React.Fragment>
                
                {
                    this.viewUserProfile() 
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

    viewUserProfile(){ //return(<div></div>);
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
                    {
                        (this.props.currentUserData)?
                        Object.keys(this.props.currentUserData).map( key => (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>{ key.toString() }</TableCell>
                                <TableCell>{ this.props.currentUserData[key] }</TableCell>
                            </TableRow>
                        ) )
                        :<TableRow>
                            <TableCell colSpan={3}>Loading...</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        );
				
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


    

}

const mapStateToProps = state => {
    console.log('currentUser.jsx-mapStateToProps', state);
    let meta = state.MetaReducer.metaData;
	return {
        metaData: meta,
        currentUserData: state.UserConfigReducer.userData.find( user => (
            user.user_id === meta.userId
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

