//import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

const uriGetTicketData = 'http://ontrack.dev.io/rest/tickets/'; // 
const uriTickets = 'http://ontrack.dev.io/rest/tickets/'; // 

const uriPropertyHistory = "http://ontrack.dev.io/rest/tickets/getcellhistoryforproperty/"; //http://ontrack.dev.io/rest/tickets/getcellhistoryforproperty/5
const uriTicketProperty = "http://ontrack.dev.io/rest/ticketproperty/"; //http://ontrack.dev.io/rest/ticketproperty/5
const uriTicketComments = "http://ontrack.dev.io/rest/cellcomment/getcellcommentsforproperty/"; //http://ontrack.dev.io/rest/cellcomment/getcellcommentsforproperty/
const uriComments = "http://ontrack.dev.io/rest/cellcomment/"


const uriSearchTicket = "http://ontrack.dev.io/rest/tickets/?search="; //http://ontrack.dev.io/rest/tickets/?search=create_date_start:2019-09-06,create_date_end:2019-10-10


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
    
    if(ticketPropertyId){
      return axios.patch(uriTicketProperty + ticketPropertyId, data)
        .then(res => {
            console.log(res);
        });
    }
    else{
      return axios.post(uriTicketProperty, data)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {
          console.log("ticketAPI update prop error", err);
          return {err:true, errMsg:err};
        });
    }
    
  }

  /** return the history of a table cell */
  retrieveCellHistory(propertyId){
    return axios.get( uriPropertyHistory + propertyId )
    .then( res => {
      console.log("ticketAPI.jsx - retrieveCellHistory",res);
      return res;
    } )
  }

  /** return the comments on a table cell */
  retrieveCellComments(propertyId){
    return axios.get( uriTicketComments + propertyId )
    .then( res => {
      console.log("ticketAPI.jsx - retrieveCellComments",res);
      return res;
    } )
  }

  /** add comments on a table cell */
  addCellComment(data){
    console.log("ticketAPI.jsx - retrieveCellComments1",uriComments, data);
    return axios.post( uriComments, data )
    .then( res => {
      console.log("ticketAPI.jsx - retrieveCellComments",res);
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


