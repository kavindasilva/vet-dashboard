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
import { MenuItem, RadioGroup, FormControlLabel, FormGroup, FormControl } from "@material-ui/core";

import Radio from '@material-ui/core/Radio';
import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
//import { styles } from '@material-ui/pickers/DatePicker/components/Calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import GridRow from 'react-bootstrap/Row'
import GridCol from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

//import userData from "../config-data/userData.json";
import { userTypes, userTypeArray } from "../common/constants";

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

class NewUser extends React.Component{
    state = {
        ...this.props.metaData, 
        partnerList: this.props.partnerData,
        //newUserType: "partnerForUser",
        newUserType: "partner",

        //newUserType: null,
        name:'', //partner name
        account_email: '', //partner email
        user_type_id: '6', // user type id 3-admin, 6-partner
        selected_partner_id:'', // partner id for user
        email:'', //user email
        telephone:'', //user telephone
        password:'', //user password
        first_name:'', //user fname
        last_name:'', //user lname
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
                {/* user type radio btn */}
                <Grid item xs={12} sm={12}>
                    <GridCol sm={10}>
                    { 
                        (userTypes)
                        ?userTypes.map( (val, i) => (
                            <Form.Check
                                key={i}
                                type="radio"
                                label={ val.label }
                                value={val.type}
                                checked={ (this.state.newUserType===val.type) }
                                name="user_types"
                                id={val.type}
                                onChange={ (e)=>{
                                    this.setState({ newUserType: e.target.value});
                                } }
                            />
                        ) )
                        : <Form.Check
                            key={1001}
                            type="radio"
                            label={"No users found in constants.jsx"}
                            name="no_user_types"
                            id="no_user_types"
                        />
                    }
                    </GridCol>
                    <RadioGroup
                        name="genderSelect"
                        value={ this.state.newUserType }
                        onChange={ (e)=>{
                            this.setState({ newUserType: e.target.value});
                            //console.log(e)
                        } }
                    >	
                        { 
                            (userTypes)
                            ?userTypes.map( (val, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={ val.type }
                                    control={<Radio color="primary" />}
                                    label={ val.label }
                                    labelPlacement="end"
                                />
                            ) )
                            : <FormControlLabel
                                key={1001}
                                control={<Radio color="primary" />}
                                value={"No users found in constants.jsx"}
                            />
                        }
                        
                    </RadioGroup>
                </Grid>

                {/* display user type specific inputs */}
                {
                    this.checkNewUserType()
                }

                {/* save cancel btns */}                
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Button
                        style={ {margin: "2px 2px 2px 2px"} }
                        variant="outline-primary"
                        onClick={ () => {
                            console.log("newUser", this.state);
                            this.saveNewUserData()
                            //userAPIObj.saveUser( this.state );
                        } }
                        //fullWidth
                    >
                        Save
                    </Button>

                    <Button 
                        style={ {margin: "2px 2px 2px 2px"} }
                        variant="outline-warning"
                        onClick={ () => this.props.cancelForm() }
                        //fullWidth
                    >
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        );
    }

    saveNewUserData=()=>{
        switch(this.state.newUserType){
            case "partner":
                userAPIObj.savePartner( this.state ); break;
            case "partnerForUser":
                userAPIObj.saveUser( this.state ); break;
            default:
                console.log("newUser - unknown user type to save", this.state.newUserType);
        }
    }

    /** display user type specific input fields */
    checkNewUserType = () =>{
        switch(this.state.newUserType){
            case "partner":
                return this.newPartner();
            case "partnerForUser":
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
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Partner Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Partner Name"
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({name: e.target.value}) 
                                } }
                                value={ this.state.name } 
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                <Grid item xs={12}>
                    <Grid item xs={12} sm={12}>Initial User</Grid>
                </Grid>
                
                {/* user first name, last name boxes */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >First Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="First Name"
                                value={ this.state.first_name }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({first_name: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Last Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Last Name"
                                value={ this.state.last_name }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({last_name: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* intial user's email */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >User email Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="User email Address"
                                value={ this.state.account_email }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({account_email: e.target.value}) 
                                } } 
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* user telephone */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Telephone</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Telephone"
                                value={ this.state.telephone }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({telephone: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group controlId="formGridSearchType"  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >User Type</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                as="select"
                                onChange={ e => {
                                    this.setState({
                                        user_type_id: e.target.value, 
                                    });
                                }}
                                value={ this.state.user_type_id } 
                            >
                            {
                                userTypeArray.map( (item, i) =>
                                    <option 
                                        key={ i } value={ i }
                                        inputtype={ item }
                                    >
                                    { 
                                        item
                                    }
                                    </option>
                                )
                            }
                            </Form.Control>
                        
                        </InputGroup>
                    </Form.Group>
                </Grid> */}
            </React.Fragment>

        );
    }

    /** add new user to existing partner */
    newUserforPartner(){
        return(
            <React.Fragment>
                {/* user type partner/admin */}                
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Form.Group   >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Select Partner</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                as="select"
                                onChange={ e => {
                                    this.setState({
                                        selected_partner_id: e.target.value
                                    });
                                }}
                                value={ this.state.selected_partner_id } 
                            >
                            {
                                (this.state.partnerList)
                                ? this.state.partnerList.map( (item, i) =>
                                    <option 
                                        key={ item.partner_id } value={ item.partner_id }
                                    >
                                        { item.partner_id } -- { item.name } -- {item.account_email}
                                    </option>
                                )
                                : <option key={ 1002 } value={ 1002 } >No partners loaded</option>
                            }
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Select 
                        value={ this.state.selected_partner_id } 
                        onChange={ e => this.setState({ selected_partner_id: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            (this.state.partnerList)
                            ? this.state.partnerList.map( item =>
                                <MenuItem 
                                    key={ item.partner_id }
                                    value={ item.partner_id } 
                                >
                                { item.partner_id } -- { item.name } -- {item.account_email}
                                </MenuItem>
                            )
                            : <MenuItem key={0} value={0}>
                                No partners loaded
                            </MenuItem>
                        }
                    </Select>
                </Grid>

                {/* user first name, last name boxes */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >First Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="First Name"
                                value={ this.state.first_name }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({first_name: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Last Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Last Name"
                                value={ this.state.last_name }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({last_name: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* email */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Email Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Email Address"
                                value={ this.state.email }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({email: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* user telephone */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Telephone</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Telephone"
                                value={ this.state.telephone }
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({telephone: e.target.value}) 
                                } }
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group   >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >User Type</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                as="select"
                                onChange={ e => {
                                    this.setState({
                                        user_type_id: e.target.value, 
                                    });
                                }}
                                value={ this.state.user_type_id } 
                            >
                            {
                                userTypeArray.map( (item, i) =>
                                    <option 
                                        key={ i } value={ i }
                                        inputtype={ item }
                                    >
                                    { 
                                        item
                                    }
                                    </option>
                                )
                            }
                            </Form.Control>
                        
                        </InputGroup>
                    </Form.Group>
                </Grid> */}

            </React.Fragment>
        )
    }

    

}

const mapStateToProps = (state, props) => {
	console.log('users.jsx-mapStateToProps', state);
	return {
        // userData: state.UserConfigReducer.userData,
        partnerData: state.UserConfigReducer.partnerData,

	};
}

//export default NewUser;
//export default connect(mapStateToProps)(NewUser);
export default connect(mapStateToProps)(withStyles(styles)(NewUser));

