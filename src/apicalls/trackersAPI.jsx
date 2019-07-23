
import React from 'react';
import axios from 'axios';

const uriGetConfigData = 'http://ontrack.dev.io/rest/trackers/'; // from db


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

  saveTrackerConfig( configJson, trackerId ){ // http://ontrack.dev.io/rest/trackers/4
    var patchUri = uriGetConfigData + trackerId;
    console.log("trackersAPI-saveTrackerConfig uri:", patchUri, configJson); //return;

    return axios.patch( patchUri, configJson )
      .then(result => {
        console.log("trackersAPI-saveTrackerConfig - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("trackersAPI-saveTrackerConfig error", error);
        return error;
      });
  }



}


export default trackersAPI;


