
import React from 'react';
import axios from 'axios';

//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php?q=';
const uriAllPartners = "http://ontrack.dev.io/rest/user/?type_id=6";
const alturiAllPartners = "http://ontrack.dev.io/api/getUsers";
const DEFAULT_QUERY = 'redux';


class userAPI extends React.Component{

  /** get all users */
  getUsers(){
    return axios.get(uriAllPartners)
    //return axios.get(alturiAllPartners)
      .then(result => {
        console.log("userAPI.jsx - getUsers", result);
        return result;
      })
      .catch(error => {
        console.log("userAPI.jsx - getUsersErr", error);
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