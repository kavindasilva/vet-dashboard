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

import FlatlyPopup from "../common/flatlyModal"
import FlatlyAlert from "../common/flatlyAlert"
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
        showModal: false,
        modalTitle: '',
        modalBody: '',
        modalType: "",

        ...this.props.metaData, 
        //partnerList: this.props.partnerData,
        //newUserType: "userForPartner",
        //newUserType: "partner",

        //newUserType: null,
        accountName:'', //account name
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
                
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} ></Grid>
                </Grid>
                { 
                    this.viewNewUserForm() 
                }
                <FlatlyPopup
                    showModal={ this.state.showModal }
                    modalTitle={ this.state.modalTitle }
                    modalBody={ this.state.modalBody }
                    hideModal={ ()=>this.setState({showModal: false}) }
                    modalStyle={ this.state.modalType }
                />
			</React.Fragment>
		)
    }

    
    viewNewUserForm(){
        return(
            <Grid container spacing={3}>
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
                                        selected_partner_id: e.target.value,
                                        newUserType: (e.target.value==="0")?"partner":"userForPartner",
                                    });
                                }}
                                value={ this.state.selected_partner_id } 
                            >
                            {
                                (this.props.partnerData)
                                ? this.props.partnerData.map( (item, i) =>
                                    <option 
                                        key={ item.partner_id } value={ item.partner_id }
                                    >
                                        { item.partner_id } -- { item.name } -- {item.account_email}
                                    </option>
                                )
                                : <option key={ 1002 } value={ 1002 } >No partners loaded</option>
                            }
                                <option key={1005} value={ "0" } 
                                    //onSelect={ ()=>{ console.log("DKDK"); this.setState({newUserType: "partner"}); } } 
                                >--New--</option>
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
                </Grid>

                {/* display user type specific inputs */}
                {
                    this.checkNewUserType()
                }
                {
                    this.newUserforPartner()
                }

                {/* save cancel btns */}                
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Button
                        style={ {margin: "2px 2px 2px 2px"} }
                        variant="outline-primary"
                        onClick={ () => {
                            console.log("newUser", this.state);
                            this.saveNewUserData()
                            .then(
                                res => {
                                    console.log("newUser save result", res);
                                    this.setState({showModal: true})
                                    if(res && !res.err){
                                        // show success
                                        this.props.cancelForm()
                                    }
                                    else if(res && res.err){
                                        this.showErrors(res.errMsg)
                                    }
                                }
                            )
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

    showErrors = ( message ) => {
        this.setState({ 
                modalTitle: "Error occurred",
                modalBody: message.toString(),
                modalType: "warning"
            }, 
            ()=>this.setState({showModal: true}) 
        )
    }

    saveNewUserData=()=>{
        switch(this.state.newUserType){
            case "partner":
                return userAPIObj.savePartner( this.state )
                break;
            case "userForPartner":
                return userAPIObj.saveUser( this.state ); 
                break;
            default:
                console.log("newUser - unknown user type to save", this.state.newUserType);
                return Promise.resolve({ err:true, errMsg: "error loading users"});
        }
    }

    /** display user type specific input fields */
    checkNewUserType = () =>{
        switch(this.state.newUserType){
            case "partner":
                console.log("newUser - partner selected", this.state.newUserType); 
                return this.newPartner();
            case "userForPartner":
                console.log("newUser - userForPartner selected", this.state.newUserType); 
                return <React.Fragment></React.Fragment>;
            default:
                console.log("newUser - unknown user type selected", this.state.newUserType);
        }
    }

    /** add new partner */
    newPartner(){
        return(
            <React.Fragment>
                {/* partner name */}
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <Form.Group  >
                        <InputGroup>
                            <InputGroup.Prepend  >
                                <InputGroup.Text >Account Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Account Name"
                                onChange={ (e)=> { 
                                    e.preventDefault(); 
                                    this.setState({accountName: e.target.value}) 
                                } }
                                value={ this.state.accountName } 
                            />
                        </InputGroup>
                    </Form.Group>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} ></Grid>
            </React.Fragment>

        );
    }

    /** add new user to existing partner */
    newUserforPartner(){
        return(
            <React.Fragment>

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

