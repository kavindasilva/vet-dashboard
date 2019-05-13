
import React, { Component } from 'react';
import Pets from "../components/pets";
import { Provider } from 'react-redux';

import Radio from '@material-ui/core/Radio';
import { MenuItem, RadioGroup, FormControlLabel, FormGroup, Button } from "@material-ui/core";


import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import { petStore } from "../stores/pets";
//import { createStore } from "redux";
//import PetReducer from "../reducers/pets";

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


import petAPI from "../apicalls/petAPI";
const petAPIobj = new petAPI();

const client1 = new ApolloClient({
  uri: 'http://127.0.0.1/phpapi/inline-index4.php',
})

//import { pokemo } from "../apicalls/petAPI";


//const petStore = createStore(PetReducer, {admissions:[ { id:'0' , name:"RoverStt" , speci:"Dog" , gender:"Male" , years:"3.5" , symptoms:["Fever", "Cold"] , admittedDate:"2019-04-01" } ]} );
//const petStore = createStore(PetReducer ,

const styles = theme => ({
	root: {
	  width: '100%',
	},
	grow: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginLeft: -12,
	  marginRight: 20,
	},
	title: {
	  display: 'none',
	  [theme.breakpoints.up('sm')]: {
		display: 'block',
	  },
	},
	search: {
	  position: 'relative',
	  borderRadius: theme.shape.borderRadius,
	  backgroundColor: fade(theme.palette.common.white, 0.15),
	  '&:hover': {
		backgroundColor: fade(theme.palette.common.white, 0.25),
	  },
	  marginLeft: 0,
	  width: '100%',
	  [theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing.unit,
		width: 'auto',
	  },
	},
	searchIcon: {
	  width: theme.spacing.unit * 9,
	  height: '100%',
	  position: 'absolute',
	  pointerEvents: 'none',
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	inputRoot: {
	  color: 'inherit',
	  width: '100%',
	},
	inputInput: {
	  paddingTop: theme.spacing.unit,
	  paddingRight: theme.spacing.unit,
	  paddingBottom: theme.spacing.unit,
	  paddingLeft: theme.spacing.unit * 10,
	  transition: theme.transitions.create('width'),
	  width: '100%',
	  [theme.breakpoints.up('sm')]: {
		width: 120,
		'&:focus': {
		  width: 200,
		},
	  },
	},
  });

class App extends Component {
	state={
		fields: [ "id", "name", "gender", "speci", "admitDate" ],
		fields2: [ {"id":{val:"ID"} }, {"name":{val:"Name"}}, {"gender":{val:"Gender"}},
			 "speci", "admitDate" ],
		selectedField: "id",
		fieldValue: ""
	}
	render() {
		//console.log('app.jsx-rendering. petStore: ', petStore.getState() );
		return (
			/*<ApolloProvider client={client}>
			
			</ApolloProvider>*/ 
			<Provider store={ petStore } >
					{ this.showMenuBar() }          
					<Pets/>
			</Provider>
		);
	}

	componentDidMount(){ 
		this.loadData(0,0);
		//this.loadData("speci","Cat");
	}

	loadData(property, value){ 
		console.log("App - Mount");
		//let data = petAPIobj.callApi()
		let data = petAPIobj.callGraphQL( property, value )
			.then( response => {
				console.log("app.jsx - response1: ",response);
				if( response.data && response.data){
					console.log("app.jsx - componenetDidMount");
					this.setState({ petAdmission: response.data.admissions })
					return response;
				}
				/*else{ // to determine CORS & CORB
					this.setState({ petAdmission: [ { id:'000' , name:"null", speci:"Dog" , gender:"Male" , years:"60" , symptoms:["Fever", "Cold"] , admittedDate:"2019-04-01" }] });
				
					return [{
						data:{ admissions: [ { id:'000' , name:"CORS/CORB", speci:"Dog" , gender:"Male" , years:"0" , symptoms:["Cold"] , admittedDate:"2010-04-01" }] }
					}];
				}*/
			})
			.then(
				response => {

					// CORS & CORB
					console.log("app.jsx - response2: ", response);
					if(  !response.data ){
						petStore.dispatch({
							type: 'FETCH_FROM_API',
							payload: {
								apiData: response[0].data.admissions
							}
						})
					}



					else{
					petStore.dispatch({
						type: 'FETCH_FROM_API',
						payload: {
							apiData: response.data.admissions
						}
					})
					}
				}
			)
	}

	/** Before GraphQL */
	componentDidMount0(){ // working
		console.log("App - Mount");
		//let data = petAPIobj.callApi()
		petAPIobj.callApi()
			.then( response => {
				console.log(response);
				if(response.data){
					//console.log("A");
					this.setState({ petAdmission: response.data })
					
				}
				return response;
			})
			.then(
				response => {
					petStore.dispatch({
						type: 'FETCH_FROM_API',
						payload: {
							apiData: response.data
						}
					})
				}
			)

		/*petStore.dispatch({
			type: 'GET_FROM_API',
			payload: {
				apiData: data
			}
		})*/

		//console.log(data);
		//let data = this.callApi0(); console.log("data", data);
	}

	showMenuBar(){
		return(
			<div >
				<AppBar position="static">
					<Toolbar>
						<IconButton  color="inherit" aria-label="Open drawer">
							<MenuIcon />
						</IconButton>
						<Typography  variant="h6" color="inherit" noWrap>
							Material-UI
						</Typography>
						<div  />
						<div >
							<div >
								
							</div>
							<TextField
								placeholder="Search…"
								value={ this.state.fieldValue }
								onChange={ (e) => {
									e.preventDefault();
									console.log("Search bar val: ", e);
									this.setState({ fieldValue: e.target.value })
								} }
							/>
							<Button onClick={ this.handleSearch }>
								<SearchIcon />Search
							</Button>
							<div>	
								{ this.state.fields.map( (val, index) => (
									<React.Fragment>
										<Radio
											name="searchType"
											key={index}
											value={ val }
											//={ val }
											control={<Radio color="primary" />}
											area-label={ val }
											checked={ (this.state.selectedField===val)? true: false }
											labelPlacement="end"
											onChange={ e =>
												this.setState({ selectedField: e.target.value})
											}
											/> 
											{val}
											
										</React.Fragment>
									)
								)}
							</div>


						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}

	handleSearch = () =>{
		//
		petAPIobj.callGraphQL( this.state.selectedField, this.state.fieldValue )
	}
}

//export default App;
export default withStyles(styles)(App);
