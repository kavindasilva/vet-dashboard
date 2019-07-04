import { createStore } from "redux";
//import PetReducer from "../reducers/pets";
import rootReducer from "../reducers/index";
import trackerInstances from "../config-data/trackerInstance";
import trackersConfig from "../config-data/trackersConfig";


const initialState = {
    /** 
     * This is for retrieve and store HUBSPOT and hubspot related DB (version) data 
     * PetReducer:[ admissions:[], tickets[] ]
     * */
    PetReducer: {
        tickets: [
            {id: 10000}
        ],
        admissions: []
    },

    PhoenixReducer:{
        //structure
        phoenixRecords:{}
    },

    TrackConfigReducer:{
        configData: trackersConfig
    },

    TrackInstaReducer:{
        instanceData: trackerInstances,
        hubspotTickets: null,
    },

    UserConfigReducer:{
        userData: null
    },

    /** This is for storing meta-data related to user and sessions */
    /* */MetaReducer : {
        metaData:{
            isLoggedIn: false,
            userId: 0,
            username: '',
            userType: 0
        } // change login.jsx
    } /* */
    // MetaReducer : { /** hard coded for tracker debugging */
    //     metaData:{
    //         isLoggedIn: true,
    //         userId: 5,
    //         username: 'hardCoded user5',
    //         userType: 3 //admin
    //     }
    // }/* */
};
//export const rootStore = createStore(PetReducer, initialState);
export const rootStore = createStore(rootReducer, initialState);