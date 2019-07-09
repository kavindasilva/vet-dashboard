import { createStore } from "redux";
//import PetReducer from "../reducers/pets";
import rootReducer from "../reducers/index";
// import trackerInstances from "../config-data/trackerInstance";
// import trackersConfig from "../config-data/trackersConfig";

/** staic config for initial state of trackers & config */
const trackersConfig=[
    {
        "trackerId" : 1, 
        "name": "initIndependent",
        "columns": [
            {
                "id": 1, 
                "name": "clinicName",
                "label": "Clinic Name",
                "type": 1, 
                "permissions": [
                    {
                        "userId" : 5,
                        "read" : false,
                        "write": false
                    }
                ],
                "rules": []
            },
            {
                "id": 2, 
                "name": "clinicName2",
                "label": "ClinicName2",
                "type": 1, 
                "permissions": [
                    {
                        "userId" : 5,
                        "read" : true,
                        "write": false
                    },
                    {
                        "userId" : 6,
                        "read" : true,
                        "write": false
                    }
                ],
                "rules": []
            },
            {
                "id": 4, 
                "name": "RFSentDate",
                "label": "RF Sent Date",
                "type": 4,
                "permissions": [
                    {
                        "userId" : 5, 
                        "read" : true,
                        "write": false
                    },
                    {
                        "userId" : 6, 
                        "read" : true,
                        "write": false
                    }
                ],
                "rules":[]
            },
            {
                "id": 5, 
                "name": "RFCompletedDate",
                "label": "RF Completed Date",
                "type": 4, 
                "permissions": [
                    {
                        "userId" : 5, 
                        "read" : true,
                        "write": true
                    }
                ],
                "rules": [
                    {
                        "precedence": 1,
                        "bgcolor" : "amber",
                        "conditions": ""
                    },
                    {
                        "precedence": 3,
                        "bgcolor" : "blue",
                        "conditions": "3"
                    },
                    {
                        "precedence": 2,
                        "bgcolor" : "red",
                        "conditions": "moment().endOf('day').fromNow()"
                    }
                ]
            },
            {
                "id": 6, 
                "name": "completed",
                "label": "Completed",
                "type": 3, 
                "permissions": [
                    {
                        "userId" : 5,
                        "read" : true,
                        "write": true
                    }
                ],
                "rules": []
            },
            {
                "id": 7, 
                "name": "duration",
                "label": "Duration",
                "type": 2, 
                "permissions": [
                    {
                        "userId" : 5,
                        "read" : true,
                        "write": true
                    }
                ],
                "rules": [
                    {
                        "precedence": 1,
                        "bgcolor" : "orange",
                        "conditions": "8",
                        "conditions3": "moment().endOf('day').fromNow()",
                        "conditions2": "moment().isAfter(moment(valueOfColumn(4)).add('3 days')",
                        "comment": "this is to test the eval function"
                    }
                ]
            }
        ]

    }
];

const trackerInstances=[
    {
        "instanceId" : 11, 
        "trackerId" : 1,    
        "data": [
            {
                "columnId": 1,
                "name": "clinicName",
                "value" : "SampleClinic1"
            },
            {
                "columnId": 2,
                "name": "clinicName2",
                "value" : "react init"
            },
            {
                "columnId": 3,
                "name": "ticketId",
                "value" : 28868819
            },
            {
                "columnId": 4,
                "name": "RFSentDate",
                "value" : "2019-01-01"
            },
            {
                "columnId": 5,
                "name": "RFCompletedDate",
                "value" : "2019-01-07"
            },
            {
                "columnId": 6,
                "name": "completed",
                "value" : "true"
            },
            {
                "columnId": 7,
                "name": "duration",
                "value" : 120
            },
            {
                "columnId": 100,
                "name": "hub_ticket_id",
                "value" : "33843436"
            }
        ]
    }
];

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



