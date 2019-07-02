
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

class EditUser extends React.Component{
    state = {
        ...this.props.metaData, 
        ...this.props.userData,
    }

	componentDidMount(){
		console.log("EditUser - mount. props:", this.props); //ok
		//console.log("EditUser - mount. props.metaData:", this.props.metaData); 
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
                        value={ this.props.userData.id }
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Select 
                        label="Name"
                        value={ this.state.type } 
                        onChange={ e => this.setState({ type: e.target.value }) }
                        fullWidth={true}
                    >
                        {
                            userTypes.map( item =>
                                    <MenuItem 
                                        key={ item.id }
                                        value={ item.type } 
                                    >{ item.label }</MenuItem>
                                )
                        }
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        onChange={ (e) => this.setState({name: e.target.value}) }
                        id="username"
                        name="username"
                        label="Name"
                        fullWidth
                        value={ this.state.name }
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        //autoComplete="billing address-line2"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        //onClick={}
                        fullWidth
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        fullWidth
                        onClick={ () => this.props.cancelForm() }
                    >
                        Cancel
                    </Button>
                </Grid>
                
            </Grid>
        );
    }

    

}

const mapStateToProps = (state, props) => {
	console.log('users.jsx-mapStateToProps', state);
	return {
        userData: state.UserConfigReducer.userData.find( user => (
            user.id === props.userId
        ) ),

	};
}

//export default EditUser;
//export default connect(mapStateToProps)(EditUser);
export default connect(mapStateToProps)(withStyles(styles)(EditUser));

