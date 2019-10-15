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
import InputGroup from 'react-bootstrap/InputGroup'

import TrackerTableHeader from "../dashboard/trackerHeader";
import TrackerTableRow from "../dashboard/trackerTableRow";

//import userData from "../config-data/userData.json";
import { userTypes } from "../common/constants";

import userAPI from "../apicalls/userAPI"
import FlatlyPopup from '../common/flatlyModal';
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
        showModal: false,
        modalTitle: '',
        modalBody: '',
        modalType: "",

        // ...this.props.metaData, 
        ...this.props.userData,
        //partnerList: this.props.partnerData,
        //editUserType: "user",
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
                {/* display user type specific inputs */}
                {
                    this.editUser()
                }
                <FlatlyPopup
                    showModal={ this.state.showModal }
                    modalTitle={ this.state.modalTitle }
                    modalBody={ this.state.modalBody }
                    hideModal={ ()=>this.setState({showModal: false}) }
                    modalStyle={ this.state.modalType }
                />

                {/* save cancel btns */}                
                <Grid item xs={6}>
                    <Button
                        onClick={ () => {
                            console.log("editUser", this.state);
                            this.saveEditedUserData()
                            .then(
                                res => {
                                    console.log("editUser save result", res);
                                    this.setState({showModal: true})
                                    if(res && !res.err){
                                        this.props.cancelForm()
                                    }
                                    else if(res && res.err){
                                        this.showErrors(res.errMsg)
                                    }
                                }
                            );
                        } }
                        style={{margin: "0px 2px 0px 2px"}}
                        variant="outline-primary"
                    >
                        Save
                    </Button>

                    <Button 
                        onClick={ () => this.props.cancelForm() }
                        style={{margin: "0px 2px 0px 2px"}}
                        variant="outline-warning"
                    >
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        );
    }

    /** edit user */
    editUser(){
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
                                        account_id: e.target.value
                                    });
                                }}
                                value={ this.state.account_id } 
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
                                : <option key={ 1004 } value={ 1004 } >No partners loaded</option>
                            }
                            </Form.Control>
                        </InputGroup>
                    </Form.Group>
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
                                <InputGroup.Text >Email</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                type="text"
                                placeholder="Email"
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

    saveEditedUserData=()=>{
        return userAPIObj.saveEditUser( this.state, this.props.userId ); 
        //return Promise.resolve({ err:true, errMsg: "error loading users"});
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

