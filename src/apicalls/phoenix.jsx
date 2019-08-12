import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';
import { useGraphQL ,GraphQL, GraphQLProvider } from 'graphql-react'

import ApolloClient from 'apollo-boost'



const APIGetUrl = 'https://phoenix.vetstoria.com/api/1.0/dashboard/clinics?key=DFG34-V3672JKWDHSD-ASD82';
//const APIGetUrl = 'http://127.0.0.1/vet-dashboard/phpApi/getData.php?q=';
const DEFAULT_QUERY = 'redux';


const client = new ApolloClient({
  uri: 'https://phoenix.vetstoria.com/api/1.0/dashboard/clinics?key=DFG34-V3672JKWDHSD-ASD82',
  //uri: 'http://ontrack.dev.io/rest/apiv/list/hubspot',
})

class Phoenix extends React.Component{

  /** Before GraphQL */
  callApi(){
    //var retStr;
    return axios.get(APIGetUrl)
      .then(result => {
        if(APP_MODE==="DEBUG")console.log("Phoenix.jsx - callAPI",result);
        //retStr=result;
        return result;
      })
      .catch(error => {
        if(APP_MODE==="DEBUG")console.log( error);
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

export default Phoenix;