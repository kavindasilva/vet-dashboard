//import {APP_MODE} from "../common/constants"
import { isUndefined } from "util";

import ticketAPI from "../apicalls/ticketAPI"
const ticketAPIobj = new ticketAPI();

const ticketsDataReducer = (state, action) => {
    console.log("ticketsDataReducer: state: ", state, "\naction: ", action)
    let newState0 = {
        ticketsReducer:{
            ticketsData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    let newState = { ...state };

    switch (action.type) {
        case 'UPDATE_CELL_VALUE': // update cell value changes
            let ticketIndex = state.ticketsData.findIndex(
                    ticket => (ticket.ticket_id === action.payload.ticketId)
                );

            if (ticketIndex >-1 ) {
                let ticket = newState.ticketsData[ticketIndex];

                let update = {};
                update[action.payload.property] = action.payload.value;

                newState.ticketsData[ticketIndex][action.payload.property] = action.payload.value;
                //newState.ticketsData[ticketIndex] = {...ticket, ...update};

                updateTicketData(action.payload.ticketId, update);
            }
            else
                console.log("trackerInstance: err2")

            console.log("ticketsDataReducer UPDATE_CELL_VALUE: ", newState);
            return newState;


        case 'GET_HUBSPOT_TICKETS': // get ticket data from hubspot
            newState = {
                ...state,
                hubspotTickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };

            console.log("ticketsDataReducer GET_HUBSPOT_TICKETS: ", newState);
            return newState;
        

        case "GET_TICKETS_FROM_DB": // get instance data from DB
            newState = {
                ...state,
                ticketsData: action.payload.data,
            }

            console.log("TrackConfigReducer GET_TICKETS_FROM_DB: ", newState);
            return newState;


        default:
            console.log("ticketsDataReducer default: ", newState0);
            return state;
    }

}

const updateTicketData = (ticketId, data) => {
    console.log("ticketData updateTicketData - saveToDB", data);
    return ticketAPIobj.updateTicketPropery(ticketId, data);
}


export default ticketsDataReducer