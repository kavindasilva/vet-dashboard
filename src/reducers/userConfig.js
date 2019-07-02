
import { isUndefined } from "util";
import userConfig from "../config-data/userData.json";


const UserConfigReducer = (state, action) => {
    console.log("UserConfigReducer: state: ", state, "\naction: ", action)
    let newState = {
        //userData: false,
        userData: userConfig,
    };

    if(state===undefined || isUndefined(state))
        state=newState;

    switch (action.type) {
        case 'UPDATE_META_DETAIL00':
            newState = {}
            console.log("UserConfigReducer_UPDATE_META_DETAIL: ", newState);

            return newState;

        default:
            console.log("UserConfigReducer_default: ", newState);
            return newState;
    }

}

export default UserConfigReducer