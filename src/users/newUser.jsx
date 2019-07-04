
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
        newUserType: null,
    }

	componentDidMount(){
		console.log("NewUser - mount. props:", this.props); //ok
		//console.log("NewUser - mount. props.metaData:", this.props.metaData); 
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
                <Grid item xs={12} sm={12}>
                    <TextField
                        disabled={ true} //required
                        id="id"
                        name="id"
                        label="ID"
                        fullWidth
                        //autoComplete="fname"
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

                {/* display user type specific inputs */}
                {
                    this.checkNewUserType()
                }

                {/* save cancel btns */}                
                <Grid item xs={6}>
                    <Button
                        //onClick={}
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
                    />
                </Grid>
            </React.Fragment>

        );
    }

    newUserforPartner(){
        return(
            <React.Fragment>
                {/* user type partner/admin */}                
                <Grid item xs={12} sm={12}>
                    <Select 
                        value={ this.state.attributeValue } 
                        onChange={ e => this.setState({ attributeValue: e.target.value }) }
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

                {/* user's partner */}                
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="partnerAccountId"
                        name="partnerAccountId"
                        label="Last Name"
                        fullWidth
                    />
                </Grid>


                {/* user's  */}                
                <Grid item xs={6}>
                    <TextField
                        id="partnerAccountId"
                        name="partnerAccountId"
                        label="Last Name"
                        fullWidth
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        fullWidth
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
                    />
                </Grid>

                {/* user telephone */}
                <Grid item xs={6}>
                    <TextField
                        //required
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        fullWidth
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

