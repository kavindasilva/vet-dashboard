//import {APP_MODE} from "../common/constants"
import React from 'react';
import axios from 'axios';

const uriGetConfigData = 'http://ontrack.dev.io/rest/trackers/'; // from db
const uriGetPipelines  = "/rest/trackers/pipes"
const uriGetTicketData = '/rest/tickets/'; // 
const uriCheckHsAuth   = "/hubspot/checkhsauth"
const uriGetLastSynced = '/rest/trackers/getlastupdatedtime'
const uriRequestToSync = "/rest/trackers/requesthsrefresh"
const uriSyncPipelines = "/rest/trackers/resyncpipelines";

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
        return {err:true, errMsg:error};
      });
  }

  /** save tracker configuration to DB */
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
        return {err:true, errMsg:error};
      });
  }

  /** get available pipelines from DB */
  getAvailablePipelines(){ 
    return axios.get( uriGetPipelines )
      .then(result => {
        console.log("trackersAPI-saveTrackerConfig - getAvailablePipelines",result);
        return result;
      })
      .catch(error => {
        console.log("trackersAPI-saveTrackerConfig error", error);
        return {err:true, errMsg:error};
      });
  }

  /** save new tracker configuration to DB */
  saveNewTracker( data ){ 
    //var patchUri = uriGetConfigData + trackerId;
    console.log("trackersAPI-saveTrackerConfig uri:", data); //return;

    return axios.post( uriGetConfigData ,data )
      .then(result => {
        console.log("trackersAPI-saveTrackerConfig - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("trackersAPI-saveTrackerConfig error", error);
        return {err:true, errMsg:error};
      });
  }

    
  /**
   * gets only the last updated date with headers
   * with empty body
   */
  getTrackerLastUpdated( ticketID ){
    var getUri= uriGetTicketData;
    if( ticketID!="" && ticketID!=null )
      getUri=uriGetTicketData + "?tracker_id=" + ticketID

    console.log("trackerAPI lastUpdateCall uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("trackerAPI.jsx - getTicketLastUpdated",result);
        return result;
      })
      .catch(error => {
        console.log("trackerAPI getTicketLastUpdated error", error);
        return {err:true, errMsg:error};
      });
  }

  /**
   * gets the last synced time
   * currently works for nva tracker only. 
   */
  getTrackerLastsynced( ticketID ){
    var getUri= uriGetLastSynced;
    if( ticketID!="" && ticketID!=null )
      getUri=uriGetLastSynced + "?tracker_id=" + ticketID

    console.log("trackerAPI lastSytnced uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("trackerAPI.jsx - getTicketLastSynced",result);
        return result;
      })
      .catch(error => {
        console.log("trackerAPI getTicketLastSynced error", error);
        return {err:true, errMsg:error};
      });
  }

  /** sends a request to synce with hubspot */
  requestToSync(){
    console.log("trackerAPI request to syncuri:", uriRequestToSync);
    return axios.get( uriRequestToSync )
      .then(result => {
        console.log("trackerAPI.jsx - requestToSync",result);
        return result;
      })
      .catch(error => {
        console.log("trackerAPI requestToSync error", error);
        return {err:true, errMsg:error};
      });
  }

  /** resync the pipelines */
  syncPipelines(){
    return axios.get( uriSyncPipelines )
      .then(result => {
        console.log("trackerAPI.jsx - syncPipelines",result);
        return result;
      })
      .catch(error => {
        console.log("trackerAPI syncPipelines error", error);
        return {err:true, errMsg:error};
      });
  }


  checkHSAuthStatus(){
    return axios.get( uriCheckHsAuth )
      .then(result => {
        console.log("trackerAPI.jsx - checkHSAuthStatus",result);
        return result;
      })
      .catch(error => {
        console.log("trackerAPI checkHSAuthStatus error", error);
        return {err:true, errMsg:error};
      });
  }


}


export default trackersAPI;


