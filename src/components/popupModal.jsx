import React from "react";
//import ReactDOM from 'react-dom';
import Popup from "reactjs-popup";
 
/*export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);*/


const Modal =  () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    closeOnDocumentClick
  >
    <span> Modal content </span>
  </Popup>
)

//render(<Modal />)