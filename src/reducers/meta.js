//import {APP_MODE} from "../common/constants"
//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

import ticketAPI from "../apicalls/ticketAPI";

import { isUndefined } from "util";

const MetaReducer = (state, action) => {
    console.log("MetaReducer: state: ", state, "\naction: ", action)
    let newState = {
        metaData:{
            isLoggedIn: false,
            userId: 0,
            username: '',
            userType: 0,

            ticketColumnWidth: '200px',
            ticketColumnHeight: '200px',
        }
    };

    //if(state===null || state==="")
    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'LOG_IN_USER':
            newState = {
                ...state,
                metaData: {
                    isLoggedIn: action.payload.loggedData.isLoggedIn,
                    userId: action.payload.loggedData.user_id,
                    userType: action.payload.loggedData.userType,
                    username: action.payload.loggedData.username,

                    userInfo: action.payload.dbData,
                }
            }

            console.log("MetaReducer UPDATE_META_DETAIL: ", newState);
            return newState;
        
        case 'LOG_OUT_USER':
            newState = {
                ...state,
                metaData: {
                    isLoggedIn: false,
                    userId: 0,
                    userType: 0,
                    username: "not logged",

                    userInfo: null,
                }
            }

            console.log("MetaReducer LOG_OUT_USER: ", newState);
            return newState;

        case 'UPDATE_CELL_SIZE':
            let stateMeta = (state.metaData) && {...state.metaData};
            newState = {
                ...state,
                metaData:{
                    ...stateMeta,
                    ticketColumnWidth: action.payload.columnWidth,
                    ticketColumnHeight: action.payload.columnHeight,
                }
            }

            console.log("MetaReducer UPDATE_CELL_SIZE: ", newState);
            return newState;

        default:
            console.log("MetaReducer_default: ", newState);
            return state;
    }

}

export default MetaReducer