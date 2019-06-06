
import React from 'react';
import axios from 'axios';
//import ApolloClient from 'apollo-boost'


const APIlistUrl = 'http://ontrack.dev.io/rest/apiv/list/DB';
const APIselectUrl = 'http://ontrack.dev.io/rest/apiv/select/';
const APIauthenticateUrl = "http://ontrack.dev.io/rest/apiv/list/DB";


class loginAPI extends React.Component{
  
  /** get data from api connected to DB */
  callApiDb( ticketID ){
    var getUri=APIlistUrl;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

    console.log("loginAPI call uri:", getUri);
    //var retStr;
    return axios.get( getUri )
      .then(result => {
        console.log("loginAPI.jsx - callAPIdb",result);
        //retStr=result;
        return result;
      })
      .catch(error => {
        console.log("loginAPI error", error);
        return error;
      });
  }

  /** send authentication data to API. currently not initialized API */
  authenticateAPI( data ){
    console.log("loginAPI - authenticateAPI", data);
    //var postUri;
    //let data1 = { product_id_list: ['pid1234', 'pid1235'] };
    
    return axios.post( APIauthenticateUrl, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
        return res.data[0];
      })
  }

  saveApiDb2( data ){ // because axios not working
    console.log("loginAPI - saveToDB", data);

    fetch( APIauthenticateUrl , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  /** The API calling function before integrating 'axios' library */
  callApi1(){
    // Github fetch library : https://github.com/github/fetch
    // Call the API page
    fetch('http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php')
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

export default loginAPI;