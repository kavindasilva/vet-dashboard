
import { isUndefined } from "util";
import trackerInstances from "../config-data/trackerInstance";


const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerInstanceReducer:{
            data: trackerInstances,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_META_DETAIL00':
            newState = {
                ...state,
                TrackerInstanceReducer: {
                    isLoggedIn: action.payload.loggedData.isLoggedIn,
                }
                
            }
            console.log("MetaReducer_UPDATE_META_DETAIL: ", newState);

            return newState;

        default:
            console.log("MetaReducer_default: ", newState);
            return state;
    }

}


export default TrackInstaReducer