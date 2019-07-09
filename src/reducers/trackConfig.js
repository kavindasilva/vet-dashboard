
import { isUndefined } from "util";

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
        case 'GET_CONFIG_FROM_DB':
            newState = {
                configData: action.payload.data,
                
            }
            console.log("TrackConfigReducer GET_CONFIG_FROM_DB: ", newState);

            return newState;

        default:
            console.log("TrackConfigReducer default: ", newState);
            return state;
    }

}

export default TrackConfigReducer