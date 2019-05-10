
import React from 'react';
import axios from 'axios';
import { GraphQL, GraphQLProvider } from 'graphql-react'


//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/phpApi/getData.php?q=';
const APIGetUrl = 'http://127.0.0.1/phpApi/getData.php?q=';
const DEFAULT_QUERY = 'redux';

//const graphQLURL = 'http://127.0.0.1/phpapi/inline-index3.php';
const graphQLURL = 'http://127.0.0.1/phpapi/inline-index4.php';

const headerInfo = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS, X-Requested-With',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
}

const GET_PET = `
  {
    admissions(id: 1 ) {
      name
      id
    }
  }
`;


class petAPI extends React.Component{
  /*state ={}

  constructor(){
    super();
  }*/

  callGraphQL( property, value ){
    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log("petAPI.jsx - callGraphQL");
    return axios.create({
      baseURL: graphQLURL
      //baseURL: 'http://127.0.0.1/phpapi/inline-index3.php'
    })
    //.post( graphQLURL, { headers: headerInfo, query: GET_PET })
    .get( '', {  query: GET_PET })
    .then(result => {
      console.log("petAPI.jsx - callGraphQL\n",result);
      return result;
    });

  }

  callGraphQL1( property, value ){ //get method
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log("petAPI.jsx - callGraphQL");
    return axios.create({
      baseURL: graphQLURL
      //baseURL: 'http://127.0.0.1/phpapi/inline-index3.php'
    })
    .get( '', { query: GET_PET })
    .then(result => {
      console.log("petAPI.jsx - callGraphQL\n",result);
      return result;
    });

  }

  /** Before GraphQL */
  callApi(){
    //var retStr;
    return axios.get(APIGetUrl + DEFAULT_QUERY)
      .then(result => {
        console.log("petAPI.jsx - callAPI",result);
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

  /** The API calling function before integrating 'axios' library */
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