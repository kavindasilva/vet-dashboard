
import { isUndefined } from "util";
import userConfig from "../config-data/userData.json";

import userAPI from "../apicalls/userAPI"

const userAPIObj = new userAPI();


const UserConfigReducer = (state, action) => {
    console.log("UserConfigReducer: state: ", state, "\naction: ", action)
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
            console.log("UserConfigReducer GET_SYSTEM_USERS: ", newState);

            return newState;
            
        case 'GET_SYSTEM_PARTNERS':
            newState = { ...state, partnerData: action.payload.partnerData }
            console.log("UserConfigReducer GET_SYSTEM_PARTNERS: ", newState);

            return newState;

        default:
            console.log("UserConfigReducer default: ", newState);
            return newState;
    }

}

export default UserConfigReducer