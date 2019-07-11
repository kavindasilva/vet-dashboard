
import React from 'react';
import axios from 'axios';
//import ApolloClient from 'apollo-boost'

import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'


const APIlistUrl = 'http://ontrack.dev.io/api/list/DB'; // from db
const APIselectUrl = 'http://ontrack.dev.io/api/select/';
const HubspotUrl="https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=<key>&properties=hs_pipeline_stage&properties=subject&properties=clinic_name";

const uriGetTicketData = 'http://ontrack.dev.io/rest/ticket/'; // 


const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para

const APIHubspotList="http://ontrack.dev.io/api/list/hubspot"

const client = new ApolloClient({
  uri: 'http://ontrack.dev.io/api/list/hubspot',
})


class ticketAPI extends React.Component{

  /** gets all ticket information from db */
  getTicketProperties( ticketID ){
    var getUri= uriGetTicketData;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

    console.log("ticketAPI call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("ticketAPI.jsx - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("ticketAPI error", error);
        return error;
      });
  }
  
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

  /** get from huspot through new API */
  callHubspot( property, value ){
    var graphqlQuery="{ tickets { portalId, objectId, clinic_name, pipeline_id, pipeline_stage_id, sub_value, sub_source, sub_sourceId, sub_timestamp, con_value, con_source, con_sourceId, con_timestamp } }";
    if( property !== 0 ){
      graphqlQuery = `{
        tickets( ${property}: "${value}" ) {
          portalId, 
          objectId, 

          clinic_name, 
          pipeline_id, 
          pipeline_stage_id,

          sub_value, 
          sub_source, 
          sub_sourceId, 
          sub_timestamp, 
          con_value, 
          con_source, 
          con_sourceId, 
          con_timestamp
        }
      }`
    }

    console.log("ticketAPI - gql query: ", graphqlQuery);

    return client.query({
      query: gql `${graphqlQuery}`
    })
    .then(response => {
      console.log("ticketAPI Hubspot response: ",response);
      return response;
    });

  }

}

export default ticketAPI;


