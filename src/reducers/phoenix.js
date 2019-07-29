//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

import ticketAPI from "../apicalls/ticketAPI";
import { rootStore } from "../stores/mainStore";
import { stat } from "fs";
import { isUndefined } from "util";


const ticketAPIobj = new ticketAPI();

const PhoenixReducer = (state, action) => {
    //console.log("PhoenixReducer: state: ", state, "\naction: ", action)
    let newState = {};

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_PHOENIX_DATA':
            newState = {
                phoenixRecords: action.payload.phoenixRecords
            };
            console.log("petReducer_FETCH_FROM_API: ", newState);
            return newState;


        /** There is a problem here. Objects are not supported to map */
        case 'UPDATE_PHOENIX_DATA1':
            newState = {
                ...state,
                phoenixRecords: action.payload.phoenixRecords.map(
                    record => { return record }
                )
            };
            console.log("petReducer_FETCH_FROM_API: ", newState);
            return newState;
            
            
        default:
            //console.log("petReducer_default: ", state);
            return state;
    }

}

export default PhoenixReducer