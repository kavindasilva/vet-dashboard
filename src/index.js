import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app";

import 'bootstrap/dist/css/bootstrap.css'; // working

import { petStore } from "./stores/pets";

//  const store = createStore(PetReducer, INITIAL_STATE );
/*const store2 = createStore(PetReducer,  { petAdmission:[ 
      { "id":'0' , "name":"RoverStt" , "speci":"Dog" , 'gender':"Male" , 'years':"3.5" , 'symptoms':["Fever", "Cold"] , 'admittedDate':"2019-04-01" },
      { "id":'1' , "name":"KingStt" , "speci":"Cat" , 'gender':"Female" , 'years':"1.2" , 'symptoms':["Bleeding"] , 'admittedDate':"2019-04-02" }
    ]}  );*/


const render = () => {
  console.log('index.js-rendering');
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render();
petStore.subscribe(render);
