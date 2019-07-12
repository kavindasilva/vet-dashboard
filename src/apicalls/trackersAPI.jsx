
import React from 'react';
import axios from 'axios';

const uriGetConfigData = 'http://ontrack.dev.io/rest/trackers/'; // from db

//const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para


class trackersAPI extends React.Component{
  
  /** get data from api connected to DB */
  getTrackerConfig( ticketID ){
    var getUri=uriGetConfigData;
    if( ticketID!="" && ticketID!=null )
      getUri=uriGetConfigData + ticketID

    console.log("trackersAPI call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        //console.log("trackersAPI.jsx - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("trackersAPI error", error);
        return error;
      });
  }



}


export default trackersAPI;


