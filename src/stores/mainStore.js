import { createStore } from "redux";
import rootReducer from "../reducers/index";

/** staic config for initial state of trackers & config */
const trackersConfig=[
    {
        "trackerId" : 1,
        "name": "Trackres Loading...",
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
                "name": "clinicName22",
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

const initialTicket=[
    {
        "ticket_id" : 11,
        "tracker_id" : 1,
    }
];

const initialState = {

    PhoenixReducer:{
        phoenixRecords:{}
    },

    TrackConfigReducer:{
        configData: trackersConfig
    },

    ticketsDataReducer:{
        ticketsData: initialTicket,
        //hubspotTickets: null,
    },

    UserConfigReducer:{
        userData: null
    },

    /** This is for storing meta-data related to user and sessions */
    MetaReducer : {
        metaData:{
            isLoggedIn: false,
            userId: 0,
            username: '',
            userType: 0
        } // change login.jsx
    } 
};

export const rootStore = createStore(rootReducer, initialState);
