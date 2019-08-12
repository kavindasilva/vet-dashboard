import {APP_MODE} from "../common/constants"
import { isUndefined } from "util";
import userConfig from "../config-data/userData.json";

import userAPI from "../apicalls/userAPI"

const userAPIObj = new userAPI();


const UserConfigReducer = (state, action) => {
    if(APP_MODE==="DEBUG")console.log("UserConfigReducer: state: ", state, "\naction: ", action)
    let newState = {
        //userData: false,
        //userData: userAPIObj.getUsers().data,
        userData: userConfig,
        partnerData: null
    };

    if(state===undefined || isUndefined(state))
        state=newState;

    switch (action.type) {
        case 'GET_SYSTEM_USERS':
            newState = { ...state, userData: action.payload.userData }
            if(APP_MODE==="DEBUG")console.log("UserConfigReducer GET_SYSTEM_USERS: ", newState);

            return newState;
            
        case 'GET_SYSTEM_PARTNERS':
            newState = { ...state, partnerData: action.payload.partnerData }
            if(APP_MODE==="DEBUG")console.log("UserConfigReducer GET_SYSTEM_PARTNERS: ", newState);

            return newState;

        default:
            if(APP_MODE==="DEBUG")console.log("UserConfigReducer default: ", newState);
            return newState;
    }

}

export default UserConfigReducer