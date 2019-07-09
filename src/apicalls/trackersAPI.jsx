
import React from 'react';
import axios from 'axios';

const APIlistUrl = 'http://ontrack.dev.io/rest/trackerconfig'; // from db
const APIselectUrl = 'http://ontrack.dev.io/rest/trackerconfig/';

const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para

// const client = new ApolloClient({
//   uri: 'http://ontrack.dev.io/api/list/hubspot',
// })

class trackersAPI extends React.Component{
  
  /** get data from api connected to DB */
  getTrackerConfig( ticketID ){
    var getUri=APIlistUrl;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

    console.log("trackersAPI call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("trackersAPI.jsx - getTrackerConfig",result);
        return result;
      })
      .catch(error => {
        console.log("trackersAPI error", error);
        return error;
      });
  }


  /** save / update data to API */
  saveToDBxx( data ){
    console.log("trackersAPI - saveToDB", data);
    
    axios.post( APIsaveUrl, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

}


export default trackersAPI;


