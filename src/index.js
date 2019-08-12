import {APP_MODE} from "./common/constants"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app";

import Records from "./oabpPhoenixFailures/records";
import Menu from "./common/menu";

import Login from "./common/login"
//import 'bootstrap/dist/css/bootstrap.css'; // working
//import Button from "@material-ui/core/Button";

import StaticFixedTable from "./dashboard/staticFixedTable"

//import { rootStore } from "./stores/rootStore";


const render = () => {
  if(APP_MODE==="DEBUG")console.log('index.js-rendering');
  ReactDOM.render(
    //<Menu />,

    <App />,
    //<StaticFixedTable />,
    
    //<Login />,
    //<Records  />,
    
    document.getElementById('root')
  );
}

//rootStore.subscribe(render);
render();
