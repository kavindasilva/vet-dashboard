//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

import ticketAPI from "../apicalls/ticketAPI";
import { petStore } from "../stores/pets";
import { stat } from "fs";
import { isUndefined } from "util";


const ticketAPIobj = new ticketAPI();

const PetReducer = (state, action) => {
    console.log("PetReducer: state: ", state, "\naction: ", action)
    let newState = {};

    //if(state===null || state==="")
    if(state===undefined || isUndefined(state))
        state=null;

    switch (action.type) {
        case 'UPDATE_PET_DETAIL':
            //let newState={}
            newState = {
                ...state,
                tickets: state.tickets.map(record => {
                    if (parseInt(record.ticket_id) == action.payload.identifier) {
                        let data = {};
                        data[action.payload.attribute] = action.payload.value;

                        console.log("pet reducer UPDATE:", {...record, ...data });
                        saveToDB({...record, ...data });
                        return {
                            ...record,
                            ...data
                        }
                    } else
                        return record;
                })
            }
            console.log("petReducer_UPDATE_PET_DETAIL: ", newState);

            //saveToDB();

            return newState;

        case 'FETCH_FROM_API': // from hubspot through api
            newState = {
                ...state,
                admissions: action.payload.apiData.map(
                    record => { return record }
                )
            };
            console.log("petReducer_FETCH_FROM_API: ", newState);
            //console.log("petReducer_GET_FROM_API: ", action.payload.apiData );
            return newState;

        case 'FETCH_TICKETS_FROM_API': // from db through api
            newState = {
                ...state,
                tickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };
            console.log("petReducer_FETCH_TICKETS_FROM_API: ", newState);
            //console.log("petReducer_GET_FROM_API: ", action.payload.apiData );
            return newState;

        default:
            return state
    }

}

const saveToDB = (allData) => {
    console.log("popup - saveToDB", allData);
    ticketAPIobj.saveApiDb(allData);
    //console.log("popup - saveToDB", allData.ticket_id);
    /*let data = ticketAPIobj.callApiDb()
        .then(response => {
            console.log("popup - Tresponse1: ", response);

            console.log("popup - componenetDidMount");
            this.setState({ petAdmission: response.data })
            return response;

        })
        .then(
            response => {
                console.log("popup - Tresponse2: ", response);

                // 
                /*petStore.dispatch({
                    type: 'FETCH_TICKETS_FROM_API',
                    payload: {
                        ticketData: response.data
                    }
                }) /* * /

            }
        ) /* */
}

export default PetReducer