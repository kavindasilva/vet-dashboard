
import { isUndefined } from "util";
import trackersConfig from "../config-data/trackersConfig";


const TrackConfigReducer = (state, action) => {
    console.log("TrackConfigReducer: state: ", state, "\naction: ", action)
    let newState = {
        TrackerConfigReducer:{
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
                TrackerConfigReducer: {
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

export default TrackConfigReducer