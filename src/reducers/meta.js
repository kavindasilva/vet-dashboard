//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

import ticketAPI from "../apicalls/ticketAPI";
//import { rootStore } from "../stores/mainStore";

import { isUndefined } from "util";

const MetaReducer = (state, action) => {
    console.log("MetaReducer: state: ", state, "\naction: ", action)
    let newState = {
        metaData:{
            isLoggedIn: false,
            userId: 0,
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
                    userId: action.payload.loggedData.user_id,
                    userType: action.payload.loggedData.userType,
                    username: action.payload.loggedData.username,
                }
                
            }
            console.log("MetaReducer_UPDATE_META_DETAIL: ", newState);

            //saveToDB();

            return newState;

        default:
            console.log("MetaReducer_default: ", newState);
            return state;
    }

}

const saveToDB = (allData) => {
    console.log("popup - saveToDB", allData);
    //ticketAPIobj.saveToDB(allData);
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
                /*rootStore.dispatch({
                    type: 'FETCH_TICKETS_FROM_API',
                    payload: {
                        ticketData: response.data
                    }
                }) /* * /

            }
        ) /* */
}

export default MetaReducer