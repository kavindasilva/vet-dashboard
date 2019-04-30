import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import { Counter } from "./components/counter";
//import Counter from "./components/counter";
import Pets from "./components/pets";

import 'bootstrap/dist/css/bootstrap.css'; // working

import { createStore } from 'redux'
import { Provider } from 'react-redux'
//import Pet from "./components/pet";
import PetReducer from './reducer/index'
import Pet from './components/pet2'
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

const store = createStore(PetReducer);


ReactDOM.render(
  <Provider store={store}>
    <Pet />
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
