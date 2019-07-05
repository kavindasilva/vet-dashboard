
import React from 'react';
import { connect } from "react-redux";
import rootReducer from "../reducers/index";
import { rootStore } from "../stores/pets";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup } from "@material-ui/core";

import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import MaterialTable from 'material-table';
import Menu from "../common/menu";
import InstantInput from "../users/instantInput";

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
	}
});

/** to be imported from constants.js */
const predefinedData=[
    { name:"admin", value:"Adminn" },
    { name:"standard", value:"STD" },
    { name:"rest", value:"Restrict" },
]

class NewUser extends React.Component{
    state = {
        ...this.props.metaData, 
        partnerList: [],

        newUserType: null,
        name:'', //partner name
        account_email: '', //partner email
        user_type_id: '6', // user type id 3-admin, 6-partner
        account_id:'', // partner id for user
        email:'', //user email
        telephone:'', //user telephone
        password:'', //user password
        first_name:'', //user fname
        last_name:'', //user lname
    }

	componentDidMount(){
		console.log("NewUser - mount. props:", this.props); //ok
        //console.log("NewUser - mount. props.metaData:", this.props.metaData); 
        
        userAPIObj.getPartners()
            .then(
                res => {
                    this.setState({partnerList: res.data });
                }
            )
	}

	render(){
		//this.viewForm() 
		return(
			<React.Fragment>
                new user form
                { 
                    this.viewNewUserForm() 
                }
			</React.Fragment>
		)
    }

    
    viewNewUserForm(){
        return(
            <Grid container spacing={3}>
                {/* user type select bar */}
                <Grid item xs={12} sm={12}>
                    <Select 
                        value={ this.state.newUserType } 
                        onChange={ e => this.setState({ newUserType: e.target.value }) }
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

                <Grid item xs={12} sm={12}>
                    <TextField
                        disabled={ true} //required
                        id="id"
                        name="id"
                        label="ID"
                        fullWidth
                    />
                </Grid>

                {/* user type radio btn */}
                <Grid item xs={12} sm={12}>
                    <RadioGroup
                        name="genderSelect"
                        value={ this.state.newUserType }
                        onChange={ (e)=>{
                            this.setState({ newUserType: e.target.value});
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
                    this.checkNewUserType()
                }

                {/* save cancel btns */}                
                <Grid item xs={6}>
                    <Button
                        onClick={ () => {
                            console.log("newUser", this.state);
                            userAPIObj.saveUser( this.state );
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

    checkNewUserType = () =>{
        switch(this.state.newUserType){
            case "partner":
                return this.newPartner();
            case "partnerUser":
                    return this.newUserforPartner();
            default:
                console.log("newUser - unknown user type selected", this.state.newUserType);
        }
    }

    /** add new partner with new user */
    newPartner(){
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

    /** add new user to existing partner */
    newUserforPartner(){
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
                            this.state.partnerList.map( item =>
                                <MenuItem 
                                    key={ item.partner_id }
                                    value={ item.partner_id } 
                                >
                                { item.partner_id } -- { item.name } -- {item.account_email}
                                </MenuItem>
                            )
                        }
                    </Select>
                </Grid>

                {/* user's partner */}                
                <Grid item xs={6}>
                    <TextField
                        //required
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
                        id="partnerAccountId"
                        name="partnerAccountId"
                        label="Last Name"
                        fullWidth
                        //value={}
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

const mapStateToProps = state => {
	console.log('users.jsx-mapStateToProps', state);
	return {
        userData: state.UserConfigReducer.userData,

	};
}

//export default NewUser;
//export default connect(mapStateToProps)(NewUser);
export default connect(mapStateToProps)(withStyles(styles)(NewUser));

