
import React from 'react';
import axios from 'axios';
//import ApolloClient from 'apollo-boost'

import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'


const APIlistUrl = 'http://ontrack.dev.io/api/list/DB'; // from db
const APIselectUrl = 'http://ontrack.dev.io/api/select/';
const HubspotUrl="https://api.hubapi.com/crm-objects/v1/objects/tickets/paged?hapikey=<key>&properties=hs_pipeline_stage&properties=subject&properties=clinic_name";

//const uriGetTicketData = 'http://ontrack.dev.io/rest/ticket/'; // 
const uriGetTicketData = 'http://ontrack.dev.io/rest/tickets/'; // 
const uriTickets = 'http://ontrack.dev.io/rest/tickets/'; // 




class ticketAPI extends React.Component{

  /** 
   * gets all ticket information from db
   * using rest api made to store tickets
   * */
  getTicketsAndProperties( ticketID ){
    var getUri= uriGetTicketData;
    if( ticketID!="" && ticketID!=null )
      getUri=uriGetTicketData + ticketID

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
  

  /** save / update data to API (temporary hubspot mapping) */
  updateTicketPropery (ticketId, data) {
    console.log("ticketAPI - saveToDB", ticketId, data); return;
    
    return axios.patch(uriTickets + ticketId, data)
                .then(res => {
                    console.log(res);
                });
  }



}

export default ticketAPI;


