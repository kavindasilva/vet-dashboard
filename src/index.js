import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app";

import Records from "./phoenix/records";
import Menu from "./common/menu";

import Login from "./common/login"
//import 'bootstrap/dist/css/bootstrap.css'; // working
//import Button from "@material-ui/core/Button";


//import { petStore } from "./stores/pets";


const render = () => {
  console.log('index.js-rendering');
  ReactDOM.render(
    //<Menu />,

    <Login />,
    //<Records  />,
    
    document.getElementById('root')
  );
}

//petStore.subscribe(render);
render();
