//import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

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
        return {err:true, errMsg:error};
      });
  }
  

  /** save / update data to API (temporary hubspot mapping) */
  updateTicketPropery (ticketId, data) {
    console.log("ticketAPI - saveToDB", ticketId, data); //return;
    
    return axios.patch(uriTickets + ticketId, data)
                .then(res => {
                    console.log(res);
                });
  }



}

export default ticketAPI;


