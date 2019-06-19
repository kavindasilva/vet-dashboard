
import { isUndefined } from "util";
import trackerInstances from "../config-data/trackerInstance";


const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerInstanceReducer:{
            instanceData: trackerInstances,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'SET_USER_PERMISSIONS':
            newState = {
                ...state,
                TrackerInstanceReducer: {
                    userPermissions: action.payload.permissions,
                }
                
            }
            console.log("TrackInstaReducer SET_USER_PERMISSIONS: ", newState);
            return newState;

        default:
            console.log("TrackInstaReducer default: ", newState);
            return state;
    }

}


export default TrackInstaReducer