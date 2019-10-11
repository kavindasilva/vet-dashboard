//import {APP_MODE} from "../common/constants"
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/mainStore";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

import GridRow from 'react-bootstrap/Row'
import GridCol from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

//import userData from "../config-data/userData.json";
import { userTypes } from "../common/constants";

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
    },
    hiddenField: {
        backgroundColor: "#888888"
    }
});

/** to be imported from constants.js */
const predefinedData=[
    { name:"admin", value:"Adminn" },
    { name:"standard", value:"STD" },
    { name:"rest", value:"Restrict" },
]

class EditUser extends React.Component{
    state = {
        ...this.props.metaData, 
        ...this.props.userData,
        partnerList: this.props.partnerData,
        editUserType: "user",
    }

	componentDidMount(){
		//console.log("EditUser - mount. props:", this.props); //
        console.log("EditUser - state:", this.state, "props", this.props); 
    }

	render(){
		return(
			<React.Fragment>
                edit user form
                { 
                    this.viewEditUserForm() 
                }
			</React.Fragment>
		)
    }

    viewEditUserForm(){
        return(
            <Grid container spacing={3}>
                {/* user type select bar */}
                <Grid item xs={12} sm={12}>
                    <Select 
                        className={  this.props.classes.hiddenField }
                        //value={ this.state.user_type_id } 
                        value="partnerForUser"
                        onChange={ e => this.setState({ user_type_id: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            userTypes.map( item =>
                                <MenuItem 
                                    key={ item.id }
                                    value={ item.type } 
                                >
                                { item.label }
                                </MenuItem>
                            )
                        }
                    </Select>
                </Grid>

                {/* account id */}
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={  this.props.classes.hiddenField }
                        disabled={ true} //required
                        id="id"
                        name="id"
                        label="ID"
                        value={ this.state.account_id }
                        fullWidth
                    />
                </Grid>

                {/* user type radio btn */}
                <Grid item xs={12} sm={12}>
                    <RadioGroup
                        name="genderSelect"
                        //value={ this.state.user_type_id }
                        value="partnerForUser"
                        onChange={ (e)=>{
                            this.setState({ user_type_id: e.target.value});
                            //console.log(e)
                        } }
                    >	
                        { 
                            userTypes.map( val => (
                                <FormControlLabel
                                    key={val.id}
                                    value={ val.type }
                                    control={<Radio color="primary" />}
                                    label={ val.label }
                                    labelPlacement="end"
                                />
                            ) )
                        }
                        
                    </RadioGroup>
                </Grid>

                {/* display user type specific inputs */}
                {
                    this.checkEditUserType()
                }

                {/* save cancel btns */}                
                <Grid item xs={6}>
                    <Button
                        onClick={ () => {
                            console.log("editUser", this.state);
                            this.saveEditedUserData();
                        } }
                        //fullWidth
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        onClick={ () => this.props.cancelForm() }
                        //fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        );
    }

    saveEditedUserData=()=>{
        switch(this.state.editUserType){
            case "partner":
                userAPIObj.saveEditPartner( this.state, this.props.userId ); 
                break; // not implemented
            case "user":
                userAPIObj.saveEditUser( this.state, this.props.userId);
                break;
            default:
                console.log("newUser - unknown user type to saveEdit", this.state.newUserType);
        }
    }

    /** determine partner or user */
    checkEditUserType = () =>{
        switch(this.state.editUserType){
            case "partner":
                return this.editPartner();
            case "user":
                    return this.editUser();
            default:
                console.log("editUser - unknown user type selected", this.state.editUserType);
        }
    }

    /** edit partner - not implemented */
    editPartner(){
        return(
            <React.Fragment>
                {/* partner name */}
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        id="name"
                        name="name"
                        label="Partner Name"
                        fullWidth
                        value={ this.state.name }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({name: e.target.value}) 
                        } }
                    />
                </Grid>

                {/* partner's email */}
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        id="account_email"
                        name="account_email"
                        label="Partner email Address"
                        fullWidth
                        value={ this.state.account_email }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({account_email: e.target.value}) 
                        } }
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid item xs={12} sm={12}>Initial User</Grid>
                </Grid>
                
                {/* user first name, last name boxes */}
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        fullWidth
                        value={ this.state.first_name }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({first_name: e.target.value}) 
                        } }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        fullWidth
                        value={ this.state.last_name }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({last_name: e.target.value}) 
                        } }
                    />
                </Grid>

                {/* user telephone */}
                <Grid item xs={12}>
                    <TextField
                        //required
                        id="telephone"
                        name="telephone"
                        label="Telephone"
                        fullWidth
                        value={ this.state.telephone }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({telephone: e.target.value}) 
                        } }
                    />
                </Grid>
            </React.Fragment>

        );
    }

    /** edit user */
    editUser(){
        return(
            <React.Fragment>
                {/* user type partner/admin */}                
                <Grid item xs={12} sm={12}>
                    <Select 
                        value={ this.state.account_id } 
                        onChange={ e => this.setState({ account_id: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            // to prevent loading delay caused error
                            (this.state.partnerList)?
                            this.state.partnerList.map( item =>
                                <MenuItem 
                                    key={ item.partner_id }
                                    value={ item.partner_id } 
                                >
                                { item.partner_id } -- { item.name } -- {item.account_email}
                                </MenuItem>
                            ):
                            <MenuItem key={0} value={0}>Loading...</MenuItem>
                        }
                    </Select>
                </Grid>

                {/* user's partner */}                
                <Grid item xs={6}>
                    <TextField
                        className={  this.props.classes.hiddenField }                        
                        id="partnerAccountId"
                        name="partnerAccountId"
                        label="Partner"
                        fullWidth
                        value={ this.state.account_id }
                    />
                </Grid>
                {/* user's  */}                
                <Grid item xs={6}>
                    <TextField
                        className={  this.props.classes.hiddenField }
                        id="userId"
                        name="userId"
                        label="User ID"
                        fullWidth
                        value={ this.props.userId }
                    />
                </Grid>

                {/* user first name, last name boxes */}
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        fullWidth
                        value={ this.state.first_name }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({first_name: e.target.value}) 
                        } }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        fullWidth
                        value={ this.state.last_name }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({last_name: e.target.value}) 
                        } }
                    />
                </Grid>

                {/* email */}
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email Address"
                        fullWidth
                        value={ this.state.email }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({email: e.target.value}) 
                        } }
                    />
                </Grid>

                {/* user telephone */}
                <Grid item xs={12}>
                    <TextField
                        //required
                        id="telephone"
                        name="telephone"
                        label="Telephone"
                        fullWidth
                        value={ this.state.telephone }
                        onChange={ (e)=> { 
                            e.preventDefault(); 
                            this.setState({telephone: e.target.value}) 
                        } }
                    />
                </Grid>




            </React.Fragment>
        )
    }

    

}

const mapStateToProps = (state, props) => {
	console.log('users.jsx-mapStateToProps', state, props);
	return {
        userData: state.UserConfigReducer.userData.find( user => (
            user.user_id === props.userId
        ) ),

        //userData: ,

        partnerData: state.UserConfigReducer.partnerData,

	};
}

//export default EditUser;
//export default connect(mapStateToProps)(EditUser);
export default connect(mapStateToProps)(withStyles(styles)(EditUser));

