import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

const uriGetConfigData = 'http://ontrack.dev.io/rest/trackers/'; // from db
const uriGetPipelines  = "http://ontrack.dev.io/rest/trackers/pipes"

class trackersAPI extends React.Component{
  
  /** get data from api connected to DB */
  getTrackerConfig( ticketID ){
    var getUri=uriGetConfigData;
    if( ticketID!="" && ticketID!=null )
      getUri=uriGetConfigData + ticketID

    if(APP_MODE==="DEBUG")console.log("trackersAPI call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        //if(APP_MODE==="DEBUG")console.log("trackersAPI.jsx - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI error", error);
        return {err:true, errMsg:error};
      });
  }

  /** save tracker configuration to DB */
  saveTrackerConfig( configJson, trackerId ){ // http://ontrack.dev.io/rest/trackers/4
    var patchUri = uriGetConfigData + trackerId;
    if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig uri:", patchUri, configJson); return;

    return axios.patch( patchUri, configJson )
      .then(result => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig error", error);
        return {err:true, errMsg:error};
      });
  }

  /** get available pipelines from DB */
  getAvailablePipelines(){ 
    return axios.get( uriGetPipelines )
      .then(result => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig - getAvailablePipelines",result);
        return result;
      })
      .catch(error => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig error", error);
        return {err:true, errMsg:error};
      });
  }

  /** save new tracker configuration to DB */
  saveNewTracker( data ){ 
    //var patchUri = uriGetConfigData + trackerId;
    if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig uri:", data); //return;

    return axios.post( uriGetConfigData ,data )
      .then(result => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        if(APP_MODE==="DEBUG")console.log("trackersAPI-saveTrackerConfig error", error);
        return {err:true, errMsg:error};
      });
  }



}


export default trackersAPI;


