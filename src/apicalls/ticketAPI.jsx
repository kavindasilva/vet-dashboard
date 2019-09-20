//import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

const uriGetTicketData = 'http://ontrack.dev.io/rest/tickets/'; // 
const uriTickets = 'http://ontrack.dev.io/rest/tickets/'; // 

const uriPropertyHistory = "http://ontrack.dev.io/rest/tickets/history/"; //http://ontrack.dev.io/rest/tickets/history/5

const uriSearchTicket = "http://ontrack.dev.io/rest/tickets/search?"; //http://ontrack.dev.io/rest/tickets/search?param=ticket_id&value=42805955

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
        return {err:true, errMsg:error};
      });
  }

  /**
   * gets all the pipeline stages
   */
  getPipelines(){
    return axios.get( 'getUri' )
      .then(result => {
        console.log("ticketAPI.jsx - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("ticketAPI error", error);
        return {err:true, errMsg:error};
      });
  }

  
  /** save / update data to API (temporary hubspot mapping) */
  updateTicketPropery (ticketPropertyId, data) {
    console.log("ticketAPI - saveToDB", ticketPropertyId, data); //return;
    
    return axios.patch(uriTickets + ticketPropertyId, data)
                .then(res => {
                    console.log(res);
                });
  }

  /** return the history of a  table cell */
  retrieveCellHistory(propertyId){
    return axios.get( uriPropertyHistory + propertyId )
    .then( res => {
      console.log("ticketAPI.jsx - retrieveCellHistory",res);
      return res;
    } )
  }

  /** return the search result  */
  searchTickets(query){
    return axios.get( uriSearchTicket + query )
    .then( res => {
      console.log("ticketAPI.jsx - searchTickets",res);
      return res;
    } )
  }



}

export default ticketAPI;


