
import React from 'react';
import axios from 'axios';
import { useGraphQL ,GraphQL, GraphQLProvider } from 'graphql-react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


const APIGetUrl = 'https://phoenix.vetstoria.com/api/1.0/dashboard/clinics?key=DFG34-V3672JKWDHSD-ASD82';
//const APIGetUrl = 'http://127.0.0.1/vet-dashboard/phpApi/getData.php?q=';
const DEFAULT_QUERY = 'redux';


const client = new ApolloClient({
  uri: 'https://phoenix.vetstoria.com/api/1.0/dashboard/clinics?key=DFG34-V3672JKWDHSD-ASD82',
  //uri: 'http://ontrack.dev.io/rest/apiv/list/hubspot',
  //uri: 'http://ontrack.dev.io/rest/graph/apiJsonRequest/',
  //uri: 'http://127.0.0.1/vet-dashboard/phpApi/inline-index4-2.php',
})

class Phoenix extends React.Component{

  /** Before GraphQL */
  callApi(){
    //var retStr;
    return axios.get(APIGetUrl)
      .then(result => {
        console.log("Phoenix.jsx - callAPI",result);
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

export default Phoenix;