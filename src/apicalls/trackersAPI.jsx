
import React from 'react';
import axios from 'axios';

const uriGetConfigData = 'http://ontrack.dev.io/rest/trackerconfig'; // from db
//const uriGetInstanceData = 'http://ontrack.dev.io/rest/trackerInstance'; // from db
const APIselectUrl = 'http://ontrack.dev.io/rest/trackerconfig/';

const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para

// const client = new ApolloClient({
//   uri: 'http://ontrack.dev.io/api/list/hubspot',
// })

class trackersAPI extends React.Component{
  
  /** get data from api connected to DB */
  getTrackerConfig( ticketID ){
    var getUri=uriGetConfigData;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

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


