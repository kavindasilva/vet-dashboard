
import { isUndefined } from "util";
import trackerInstances from "../config-data/trackerInstance";


const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerInstanceReducer:{
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
                TrackerInstanceReducer: {
                    isLoggedIn: action.payload.loggedData.isLoggedIn,
                    userID: action.payload.loggedData.user_id,
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


export default TrackInstaReducer