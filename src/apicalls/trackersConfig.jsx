
import React from 'react';
import axios from 'axios';

const APIlistUrl = 'http://ontrack.dev.io/api/list/DB'; // from db
const APIselectUrl = 'http://ontrack.dev.io/api/select/';

const APIsaveUrl = "http://ontrack.dev.io/api/insertdata/x"; // x to add garbage para

const client = new ApolloClient({
  uri: 'http://ontrack.dev.io/api/list/hubspot',
})

class trackersConfig extends React.Component{
  
  /** get data from api connected to DB */
  callApiDb( ticketID ){
    var getUri=APIlistUrl;
    if( ticketID!="" && ticketID!=null )
      getUri=APIselectUrl + ticketID

    console.log("trackersConfig call uri:", getUri);
    return axios.get( getUri )
      .then(result => {
        console.log("trackersConfig.jsx - callAPIdb",result);
        return result;
      })
      .catch(error => {
        console.log("trackersConfig error", error);
        return error;
      });
  }


  /** save / update data to API */
  saveToDB( data ){
    console.log("trackersConfig - saveToDB", data);
    //var postUri;
    //let data1 = { product_id_list: ['pid1234', 'pid1235'] };
    
    axios.post( APIsaveUrl, data )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

}


export default trackersConfig;


