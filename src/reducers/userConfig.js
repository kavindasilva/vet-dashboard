
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
    };

    if(state===undefined || isUndefined(state))
        state=newState;

    switch (action.type) {
        case 'GET_SYSTEM_PARTNERS':
            newState = { userData: action.payload.userData }
            console.log("UserConfigReducer_GET_SYSTEM_PARTNERS: ", newState);

            return newState;

        default:
            console.log("UserConfigReducer_default: ", newState);
            return newState;
    }

}

export default UserConfigReducer