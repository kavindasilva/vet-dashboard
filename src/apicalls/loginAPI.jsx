

import React from 'react';
import axios from 'axios';


const APIlistUrl = 'http://ontrack.dev.io/api/list/DB';
const APIselectUrl = 'http://ontrack.dev.io/api/select/';


const APIauthenticateUrl = "http://ontrack.dev.io/login/user/login";
const altAPIauthenticateUrl = "http://ontrack.dev.io/api/signin";


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

  auth3( username, password, otp ){
    let data = {
      "account_email": "ks@vetstoria.com",
      "account_password": "123",
      "is_otp_required": true,
      "otp": "qaauto"
    } ;/* */

    /* */data = {
      "account_email": username,
      "account_password": password,
      "is_otp_required": true,
      "otp": otp
    } ;

    console.log("loginAPI - auth3", data);

    return axios.post( 
      APIauthenticateUrl,
      //altAPIauthenticateUrl, 

       data ,

      { headers: { 
        'Content-Type': 'application/json' ,
      } }
      // { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log("loginAPI - axios reponse:", res);

        //console.log(res);
        console.log(res.data);
        return res;
      })

    //sample response
    //{"type":3,"account_id":"1","user_id":2}

    
  }

  /** send authentication data to API. currently not initialized API */
  authenticateAPI( data0 ){
    let data = {
      "account_email": "ks@vetstoria.com",
      "account_password": "123",
      "is_otp_required": true,
      "otp": "qaauto"
    };

    data = JSON.parse(" { \"account_email\": \"ks@vetstoria.com\", \"account_password\": \"123\", \"is_otp_required\": true, \"otp\": \"qaauto\" } ");
    console.log("loginAPI - authenticateAPI", data);
    
     axios.post( APIauthenticateUrl, data, { method:'post' } )
      .then((res) => {
        console.log("loginAPI - axios reponse:", res);
        console.log(res.data);
        return res.data[0];
      })

    // sample response
    // {"type":3,"account_id":"1","user_id":2}
  }

}

export default loginAPI;