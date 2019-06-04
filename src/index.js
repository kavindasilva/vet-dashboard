import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app";

import Records from "./phoenix/records";

//import 'bootstrap/dist/css/bootstrap.css'; // working
//import Button from "@material-ui/core/Button";


//import { petStore } from "./stores/pets";


const render = () => {
  console.log('index.js-rendering');
  ReactDOM.render(
    //<App />,
    <Records  
      
    />,
    document.getElementById('root')
  );
}

//petStore.subscribe(render);
render();
