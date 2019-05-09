
import React, { Component } from 'react';
import Pets from "../components/pets";
import { Provider } from 'react-redux';

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


import { petStore } from "../stores/pets";
//import { createStore } from "redux";
//import PetReducer from "../reducers/pets";

import petAPI from "../apicalls/petAPI";
const petAPIobj = new petAPI();


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
	render() {
		//console.log('app.jsx-rendering. petStore: ', petStore.getState() );
		return (
            //<Provider store={ petStore } >
            <Provider store={ petStore } >
				{ this.showMenuBar() }
                <Pets/>
            </Provider>
		);
	}

	componentDidMount(){ // working
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
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								
							/>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

//export default App;
export default withStyles(styles)(App);
