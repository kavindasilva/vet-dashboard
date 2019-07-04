
import React from 'react';
import axios from 'axios';

//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php?q=';
const uriAllUsers = "http://ontrack.dev.io/rest/user/?type_id=6";
const alturiAllUsers = "http://ontrack.dev.io/api/getUsers";

const DEFAULT_QUERY = 'redux';
const uriAllPartners="http://ontrack.dev.io/rest/partner"

const newUserSave="http://ontrack.dev.io/rest/partner"; // post

class userAPI extends React.Component{

  /** get all users */
  getUsers(){
    return axios.get(uriAllUsers)
    //return axios.get(alturiAllUsers)
      .then(result => {
        console.log("userAPI.jsx - getUsers", result);
        return result;
      })
      .catch(error => {
        console.log("userAPI.jsx - getUsersErr", error);
        return error;
      });

  }

  /** get all partners */
  getPartners(){
    return axios.get(uriAllPartners)
    //return axios.get(alturiAllPartners)
      .then(result => {
        console.log("userAPI.jsx - getPartners", result);
        return result;
      })
      .catch(error => {
        console.log("userAPI.jsx - getPartnersErr", error);
        return error;
      });

  }

  /** save new user data to API */
  saveUser( data ){
    console.log("ticketAPI - saveToDB", data);
    //var postUri;
    //let data1 = { product_id_list: ['pid1234', 'pid1235'] };
    
    axios.post( newUserSave, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  /** The API calling function before integrating 'axios' library */
  callApi1(){
    fetch('http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php')
      .then((result) => {
        return result.json();
      })
      .then((jsonResult) => {
        this.setState({ petAdmission: jsonResult });
        return jsonResult;
      })
  }
}

export default userAPI;