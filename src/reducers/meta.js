//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

import ticketAPI from "../apicalls/ticketAPI";
//import { petStore } from "../stores/pets";

import { isUndefined } from "util";

const MetaReducer = (state, action) => {
    console.log("MetaReducer: state: ", state, "\naction: ", action)
    let newState = {
        metaData:{
            isLoggedIn: false,
            userID: 0,
            username: '',
            userType: 0
        }
    };

    //if(state===null || state==="")
    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_META_DETAIL':
            //let newState={}
            newState = {
                ...state,
                metaData: {
                    isLoggedIn: action.payload.loggedData.isLoggedIn,
                    userID: action.payload.loggedData.user_id,
                    userType: action.payload.loggedData.userType,
                    username: action.payload.loggedData.username,
                }
                
                //metaData: state.metaData.map(record => {
                    
                //})
            }
            console.log("MetaReducer_UPDATE_META_DETAIL: ", newState);

            //saveToDB();

            return newState;

        case 'FETCH_META_FROM_API': // from hubspot through api
            newState = {
                ...state,
                admissions: action.payload.apiData.map(
                    record => { return record }
                )
            };
            console.log("MetaReducer_FETCH_FROM_API: ", newState);
            //console.log("MetaReducer_GET_FROM_API: ", action.payload.apiData );
            return newState;

        case 'FETCH_META_TICKETS_FROM_API': // from db through api
            newState = {
                ...state,
                tickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };
            console.log("MetaReducer_FETCH_TICKETS_FROM_API: ", newState);
            //console.log("MetaReducer_GET_FROM_API: ", action.payload.apiData );
            return newState;

        default:
            //return state
            return newState;
    }

}

const saveToDB = (allData) => {
    console.log("popup - saveToDB", allData);
    //ticketAPIobj.saveApiDb(allData);
    //console.log("popup - saveToDB", allData.ticket_id);
    /*let data = ticketAPIobj.callApiDb()
        .then(response => {
            console.log("popup - Tresponse1: ", response);

            console.log("popup - componenetDidMount");
            this.setState({ petAdmission: response.data })
            return response;

        })
        .then(
            response => {
                console.log("popup - Tresponse2: ", response);

                // 
                /*petStore.dispatch({
                    type: 'FETCH_TICKETS_FROM_API',
                    payload: {
                        ticketData: response.data
                    }
                }) /* * /

            }
        ) /* */
}

export default MetaReducer