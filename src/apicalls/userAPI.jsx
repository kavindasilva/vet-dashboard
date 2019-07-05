
import React from 'react';
import axios from 'axios';

//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php?q=';
const uriAllUsers = "http://ontrack.dev.io/rest/user/?type_id=6";
const uriAllPartners="http://ontrack.dev.io/rest/partner"
const alturiAllUsers = "http://ontrack.dev.io/api/getUsers";


const newUserSave="http://ontrack.dev.io/rest/user"; // post
const newPartnerSave="http://ontrack.dev.io/rest/partner"; // post

const editUserSave="http://ontrack.dev.io/rest/"; // 
const ediPartnerSave="http://ontrack.dev.io/rest/"; // 

const uriSingleUser="http://ontrack.dev.io/rest/user/" // get
const uriSinglePartner="http://ontrack.dev.io/rest/partner/" // get


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
        console.log("userAPI.jsx - getUsers-Err", error);
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
        console.log("userAPI.jsx - getPartners-Err", error);
        return error;
      });

  }

  /** get single user. http://ontrack.dev.io/rest/user/1 */
  getSingleUser( userId ){
    return axios.get(uriSingleUser + userId )
      .then(result => {
        console.log("userAPI.jsx - getSingleUser", result);
        return result;
      })
      .catch(error => {
        console.log("userAPI.jsx - getSingleUser-Err", error);
        return error;
      });

  }

  /** save new user data to API */
  saveUser( data ){
    console.log("userAPI - saveUser", data);
    axios.post( newUserSave, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - saveUser-Err", error);
        return error;
      });
  }

  /** save new partner user data to API */
  savePartner( data ){
    console.log("userAPI - savePartner", data);
    axios.post( newUserSave, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - savePartner-Err", error);
        return error;
      });
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