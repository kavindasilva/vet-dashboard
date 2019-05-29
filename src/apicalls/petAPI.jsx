
import React from 'react';
import axios from 'axios';
import { useGraphQL ,GraphQL, GraphQLProvider } from 'graphql-react'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


//const APIGetUrl = 'http://127.0.0.1/ucsc5/vet-dashboard/vet-dashboard/phpApi/getData.php?q=';
const APIGetUrl = 'http://127.0.0.1/vet-dashboard/phpApi/getData.php?q=';
const DEFAULT_QUERY = 'redux';


const client = new ApolloClient({
  //uri: 'http://127.0.0.1/vet-dashboard/phpApi/inline-index4-5.php',
  //uri: 'http://127.0.0.1/vet-dashboard/phpApi/inline-index4.php', // working
  //uri: 'http://ontrack.dev.io/graph/apiJsonRequest/',
  uri: 'http://ontrack.dev.io/rest/graph/apiJsonRequest/',
  //uri: 'http://127.0.0.1/vet-dashboard/phpApi/inline-index4-2.php',
})

class petAPI extends React.Component{
  /*state ={}

  constructor(){
    super();
  }*/
  callGraphQL ( property, value ){
    //useGraphQL( fetchOp )
    //PokemonImage("x");
    //return this.callGraphQL2(0,0);

    //var graphqlQuery="{ tickets { portalId, objectId } }";
    /* */var graphqlQuery="{ tickets { portalId, objectId, properties{ subject{value, timestamp, source, sourceId}, content{value, timestamp, source, sourceId} } } }";
    if( property !== 0 ){
      graphqlQuery = `{
        admissions( ${property}: "${value}" ) {
          id, 
          name,
          speci,
          gender,
          symptoms
          years,
          admittedDate
        }
      }`
    }

    console.log("petAPI - gql query: ", graphqlQuery);

    //if(property===0){
      return client.query({
        query: gql `${graphqlQuery}`
        //query: gql `{admissions { id, name, speci, gender, years, admittedDate } }` 
      })
      .then(response => {
        console.log("petAPI response: ",response.data);
        return response;
      });
    //}

    return client.query({
      //query: gql `${graphqlQuery}`
      query: gql `{
        admissions( ${property}: "${value}" ) {
          id, 
          name,
          speci,
          gender,
          years,
          admittedDate
        }
      }` 
    })
    .then(response => {
      console.log(response.data);
      return response;
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

export default petAPI;