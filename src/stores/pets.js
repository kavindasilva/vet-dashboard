import { createStore } from "redux";
//import PetReducer from "../reducers/pets";
import rootReducer from "../reducers/index";

const initialState = {
    /** 
     * This is for retrieve and store HUBSPOT and hubspot related DB (version) data 
     * PetReducer:[ admissions:[], tickets[] ]
     * */
    PetReducer: {
        tickets: [
            {id: 10000}
        ]
    },

    PhoenixReducer:{
        //structure
        phoenixRecords:{}
    },

    // phoenix: [{
    //     id:20000
    // }],

    /** This is for storing meta-data related to user and sessions */
    /*MetaReducer : {
        metaData:{
            isLoggedIn: false,
            userID: 0,
            username: '',
            userType: 0
        }
    }*/
    MetaReducer : { /** hard coded for tracker debugging */
        metaData:{
            isLoggedIn: true,
            userID: 5,
            username: 'hardCoded user5',
            userType: 3 //admin
        }
    }
};
//export const petStore = createStore(PetReducer, initialState);
export const petStore = createStore(rootReducer, initialState);