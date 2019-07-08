
import { isUndefined } from "util";
import trackersConfig from "../config-data/trackersConfig";


const TrackConfigReducer = (state, action) => {
    console.log("TrackConfigReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerConfigReducer:{
            configData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_META_DETAIL00':
            newState = {
                ...state,
                TrackerConfigReducer: {
                    configData: action.payload.loggedData.isLoggedIn,
                }
                
            }
            console.log("TrackConfigReducer_UPDATE_META_DETAIL: ", newState);

            return newState;

        default:
            console.log("TrackConfigReducer_default: ", newState);
            return state;
    }

}

export default TrackConfigReducer