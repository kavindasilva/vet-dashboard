//import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

const uriGetPartnerAccount = 'http://ontrack.dev.io/rest/user/?account_id=6';
const uriAllUsers = "/rest/user/";
const uriAllPartners="/rest/partner"
const alturiAllUsers = "/api/getUsers";


const uriNewUserSave="/rest/user"; // post
const uriNewPartnerSave="/rest/partner"; // post

const uriEditUserSave="/rest/user/"; // put
const uriEdiPartnerSave="/rest/partner/"; // put

const uriSingleUser="/rest/user/" // g
const uriSinglePartner="/rest/partner/" // ge


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
        return {err:true, errMsg:error};
        //throw new Error("userAPI getUsers, ",error);
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
        return {err:true, errMsg:error};
      });

  }

  /** get all in partner account */
  getPartnersAccount(){
    return axios.get(uriGetPartnerAccount)
      .then(result => {
        console.log("userAPI.jsx - getPartnerAccount", result);
        return result;
      })
      .catch(error => {
        console.log("userAPI.jsx - getPartnerAccount-Err", error);
        return {err:true, errMsg:error};
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
        return {err:true, errMsg:error};
      });

  }

  /** save EDIT user data to API. http://ontrack.dev.io/rest/user/9 */
  saveEditUser( data, userId ){
    console.log("userAPI - saveEditUser", data, userId); return;
    axios.put( uriEditUserSave+userId, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - saveEditUser-Err", error);
        return {err:true, errMsg:error};
      });
  }

  /** save EDIT partner data to API. http://ontrack.dev.io/rest/partner/9 */
  saveEditPartner( data, partnerId ){
    console.log("userAPI - saveEditPartner", data, partnerId); return;
    axios.put( uriEdiPartnerSave+partnerId, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - saveEditPartner-Err", error);
        return {err:true, errMsg:error};
      });
  }

  /** save new user data to API */
  saveUser( data ){
    console.log("userAPI - saveUser", data); return;
    axios.post( uriNewUserSave, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - saveUser-Err", error);
        return {err:true, errMsg:error};
      });
  }

  /** save new partner user data to API */
  savePartner( data ){
    console.log("userAPI - savePartner", data); return;
    axios.post( uriNewPartnerSave, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log("userAPI.jsx - savePartner-Err", error);
        return {err:true, errMsg:error};
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