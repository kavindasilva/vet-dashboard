import { createStore } from "redux";
//import PetReducer from "../reducers/pets";
import rootReducer from "../reducers/index";

const initialState = {
    // admissions: [{
    //     id: '22250',
    //     name: "RoverStt",
    //     speci: "Dog",
    //     gender: "Male",
    //     years: "60",
    //     symptoms: ["Fever", "Cold"],
    //     admittedDate: "2019-04-01"
    // }],

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
    MetaReducer : {
        metaData:{
            isLoggedIn: false,
            userID: 0,
            username: '',
            userType: 0
        }
    }
};
//export const petStore = createStore(PetReducer, initialState);
export const petStore = createStore(rootReducer, initialState);