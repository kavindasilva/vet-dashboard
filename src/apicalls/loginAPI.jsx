
import React from 'react';
import axios from 'axios';


const APIlistUrl = 'http://ontrack.dev.io/api/list/DB';
const APIselectUrl = 'http://ontrack.dev.io/api/select/';
//const APIauthenticateUrl = "http://ontrack.dev.io/api/user/login/";
//const APIauthenticateUrl = "http://ontrack.dev.io/login/user/login";
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

    //axios.post( APIauthenticateUrl, "{ 'account_email':'ks@vetstoria.com' }" ) // POST 400
    return axios.post( 
      //APIauthenticateUrl,
      altAPIauthenticateUrl, 

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
    //data = JSON.parse(" { account_email: \"ks@vetstoria.com\", account_password: \"123\", is_otp_required: true, otp: \"qaauto\" } ");
    console.log("loginAPI - authenticateAPI", data);
    //var postUri;
    //let data1 = { product_id_list: ['pid1234', 'pid1235'] };
    
     axios.post( APIauthenticateUrl, data, { method:'post' } )
      .then((res) => {
        console.log("loginAPI - axios reponse:", res);
        console.log(res.data);
        return res.data[0];
      })

    // sample response
    // {"type":3,"account_id":"1","user_id":2}
  }

  auth2( data ){ // because axios not working
    console.log("loginAPI - auth2", data);

    fetch( '/api/user/login' , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //firstParam: 'yourValue',
        //secondParam: 'yourOtherValue',
        account_email: "ks@vetstoria.com",
        account_password: "123",
        is_otp_required: true,
        otp: "qaauto"
      })
    })
    .then(res => {
      console.log("loginAPI - auth2 response:", res);
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