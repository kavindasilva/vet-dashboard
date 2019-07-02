
import React from 'react';
import axios from 'axios';
//import ApolloClient from 'apollo-boost'



const DEFAULT_QUERY = 'redux';

const APIlistUrl = 'http://ontrack.dev.io/api/list/DB';
const APIselectUrl = 'http://ontrack.dev.io/api/select/';


//const APIsaveUrl = "http://ontrack.dev.io/rest/apiv/insertdata";
const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para


class ticketAPI extends React.Component{
  
  /** get data from api connected to DB */
  callApiDb( ticketID ){
    var getUri=APIlistUrl;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

    console.log("ticketAPI call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("ticketAPI.jsx - callAPIdb",result);
        return result;
      })
      .catch(error => {
        console.log("ticketAPI error", error);
        return error;
      });
  }


  /** save / update data to API */
  saveToDB( data ){
    console.log("ticketAPI - saveToDB", data);
    //var postUri;
    //let data1 = { product_id_list: ['pid1234', 'pid1235'] };
    
    axios.post( APIsaveUrl, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  /** Not used. This was used because axios was not working */
  saveApiDb2( data ){ // because axios not working
    console.log("ticketAPI - saveToDB", data);

    fetch( APIsaveUrl , {
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

  /** Not used. Reason unknown why this method is not working */
  saveApiDb0( data ){ // don't know why not working
    console.log("ticketAPI - saveToDB", data);

    var postUri;
    data = { id:1};
    axios.post( APIsaveUrl,  data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  /**Not used. Before GraphQL */
  callApi(){
    //var retStr;
    return axios.get(APIlistUrl + DEFAULT_QUERY)
      .then(result => {
        console.log("petAPI.jsx - callAPI",result);
        //retStr=result;
        return result;
      })
      .catch(error => {
        console.log( error);
        return error;
      });

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

export default ticketAPI;