import {APP_MODE} from "../common/constants"
import { isUndefined } from "util";

import ticketAPI from "../apicalls/ticketAPI"
const ticketAPIobj = new ticketAPI();

const ticketsDataReducer = (state, action) => {
    if(APP_MODE==="DEBUG")console.log("ticketsDataReducer: state: ", state, "\naction: ", action)
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
            let index = state.ticketsData.findIndex(
                    ticket => (ticket.ticket_id === action.payload.ticketId)
                );

            if (index >-1 ) {
                let ticket = newState.ticketsData[index];

                let update = {};
                update[action.payload.property] = action.payload.value;

                newState.ticketsData[index][action.payload.property] = action.payload.value;
                //newState.ticketsData[index] = {...ticket, ...update};

                updateTicketData(action.payload.ticketId, update);
            }
            else
                if(APP_MODE==="DEBUG")console.log("trackerInstance: err2")

            if(APP_MODE==="DEBUG")console.log("ticketsDataReducer UPDATE_CELL_VALUE: ", newState);
            return newState;


        case 'GET_HUBSPOT_TICKETS': // get ticket data from hubspot
            newState = {
                ...state,
                hubspotTickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };

            if(APP_MODE==="DEBUG")console.log("ticketsDataReducer GET_HUBSPOT_TICKETS: ", newState);
            return newState;
        

        case "GET_TICKETS_FROM_DB": // get instance data from DB
            newState = {
                ...state,
                ticketsData: action.payload.data,
            }

            if(APP_MODE==="DEBUG")console.log("TrackConfigReducer GET_TICKETS_FROM_DB: ", newState);
            return newState;


        default:
            if(APP_MODE==="DEBUG")console.log("ticketsDataReducer default: ", newState0);
            return state;
    }

}

const updateTicketData = (ticketId, data) => {
    if(APP_MODE==="DEBUG")console.log("ticketData updateTicketData - saveToDB", data);
    return ticketAPIobj.updateTicketPropery(ticketId, data);
}


export default ticketsDataReducer