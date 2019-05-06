
import React from 'react';
import axios from 'axios';

//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/phpApi/getData.php?q=';
const APIGetUrl = 'http://127.0.0.1/phpApi/getData.php?q=';
const DEFAULT_QUERY = 'redux';


class petAPI extends React.Component{
  /*state ={}

  constructor(){
    super();
  }*/

  callApi(){
    //var retStr;
    return axios.get(APIGetUrl + DEFAULT_QUERY)
      .then(result => {
        //console.log(result);
        //retStr=result;
        return result;
      })
      .catch(error => {
        console.log( error);
        return error;
      });

     //return retStr;

    /**axios.get(API + DEFAULT_QUERY)
      .then(result => this.setState({
        hits: result.data.hits,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));/**/
  }

  callApi1(){
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