
import React, { Component } from 'react';
//import Popup from "../components/popupModal";
//import Popup from "reactjs-popup";

//import Select from 'react-select';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

//import PopDialog from "./popupModal";

class petAPI extends Component{

  callApi(){
    // Github fetch library : https://github.com/github/fetch
    // Call the API page
    fetch('http://127.0.0.1/ucsc5/vet-dashboard/phpApi/getData.php')
      .then((result) => {
      // Get the result
      // If we want text, call result.text()
      return result.json();
      })
      .then((jsonResult) => {
      // Do something with the result
      //console.log(jsonResult);
      this.setState({ petAdmission: jsonResult });
      return jsonResult;
      })
  }
}

export default petAPI;