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

            if (ticketIndex >-1 && newState.ticketsData[ticketIndex]["properties"] ) {
                let propertyIndex = newState.ticketsData[ticketIndex]["properties"].findIndex(
                    prop => (prop.column_name === action.payload.property)
                )
                
                if(propertyIndex > -1){
                    newState.ticketsData[ticketIndex]["properties"][propertyIndex]['value'] = action.payload.value;
                    updateTicketData(action.payload.ticketPropertyId, { value: action.payload.value, description: 'static'});
                }
                else{
                    console.log("trackerInstance: err3")
                    updateTicketData(null, {
                        value: action.payload.value, 
                        description: 'new static',
                        ticket_id: action.payload.ticketId,
                        tracker_column_id: action.payload.tracker_column_id
                    })
                    .then( res => {
                        if(res && !res.err && res.data && res.data.ticket_property_id){
                            // how to refetch tickets?
                        }
                    })
                }
            }
            else
                console.log("trackerInstance: err2")

            console.log("ticketsDataReducer UPDATE_CELL_VALUE: ", newState);
            return newState;


        case 'GET_HUBSPOT_TICKETS': // currently not used
            newState = {
                ...state,
                hubspotTickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };
            console.log("ticketsDataReducer GET_HUBSPOT_TICKETS: ", newState);
            return newState;
        

        case "GET_TICKETS_FROM_DB": // get tickets data from DB
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
/**
 * should call to ticket updating API endpoint
 */
const updateTicketData = (ticketPropertyId, data) => {
    console.log("ticketData updateTicketData - saveToDB", data);
    return ticketAPIobj.updateTicketPropery(ticketPropertyId, data);
}


export default ticketsDataReducer