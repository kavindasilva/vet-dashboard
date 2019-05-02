import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import { Counter } from "./components/counter";
//import Counter from "./components/counter";

import Pets from "./components/pets";
import PetReducer from './reducer/index'
//import Pet from './components/pet2'

import 'bootstrap/dist/css/bootstrap.css'; // working

import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import Pet from "./components/pet";
//import rootReducer from './reducers'


// redux store
function reducer1(state, action) {
  console.log('reducer', state, action);
  switch(action.type) {
    case 'GETNAME':
      return {
        name: state.name + " getName"
      };

    case 'INCREMENT':
      return {
        name: state.name + " getName"
      };

    default:
      return state;
  }
}

//  const store = createStore(PetReducer, INITIAL_STATE );
const store = createStore(PetReducer,  { petAdmission:[ 
      { "id":'0' , "name":"RoverStt" , "speci":"Dog" , 'gender':"Male" , 'years':"3.5" , 'symptoms':["Fever", "Cold"] , 'admittedDate':"2019-04-01" },
      { "id":'1' , "name":"KingStt" , "speci":"Cat" , 'gender':"Female" , 'years':"1.2" , 'symptoms':["Bleeding"] , 'admittedDate':"2019-04-02" },
      { "id":'2' , "name":"KittyStt" , "speci":"Cat" , 'gender':"Male" , 'years':'3' , 'symptoms':["Swating" , "RefusingFood"] , 'admittedDate':"2019-04-02" },
      { "id":'3' , "name":"PeterStt" , 'speci':"Bird" , 'gender':"Male" , 'years':'1' , 'symptoms':["Sleeping"] , 'admittedDate':"2019-04-03" },
      { "id":'4' , "name":"TommyStt" , 'speci':"Dog" , 'gender':"Female" , 'years':'2' , 'symptoms':["Cold"] , 'admittedDate':"2019-04-03" }

    ]}  );


ReactDOM.render(
  <Provider store={store}>
    <Pets 
      stateInfo={ store.getState() }
      tmp1={ console.log("state: ",store.getState()) }
    />
  </Provider>,
  document.getElementById('root')
);

/*const App = () => (
  <Provider store={store}>
    <Pet/>
  </Provider>
);*/
//---------------------------

//ReactDOM.render(  <Pets />,  document.getElementById('root') );
