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
    let ticketIndex = null;
    let propertyIndex = null;


    switch (action.type) {
        case 'UPDATE_CELL_VALUE': // update cell value changes
            ticketIndex = getTicketIndexById(newState, action.payload.ticketId);

            if (ticketIndex >-1 && newState.ticketsData[ticketIndex]["properties"] ) {
                propertyIndex = getPropertyIndexByColumnName(newState, ticketIndex, action.payload.property)

                if(propertyIndex > -1){
                    newState.ticketsData[ticketIndex]["properties"][propertyIndex]['value'] = action.payload.value;
                }
                else{
                    console.log("trackerInstance: err3")
                    let tempObj ={
                        ticket_property_id: 4294967295,
                        ticket_id: action.payload.ticketId,
                        value: action.payload.value,
                        column_name: action.payload.property,
                        tracker_column_id: action.payload.tracker_column_id
                    };
                    
                    state.ticketsData[ticketIndex]["properties"].push(tempObj);
                }

            }
            else
                console.log("trackerInstance: err2")

            console.log("ticketsDataReducer UPDATE_CELL_VALUE: ", newState);
            return newState;

        
        case "ADD_CELL_TICKET_PROPERTY_ID":
            ticketIndex = getTicketIndexById(newState, action.payload.ticketId);

            if (ticketIndex >-1 && newState.ticketsData[ticketIndex]["properties"] ) {
                propertyIndex = getPropertyIndexByColumnName(newState, ticketIndex, action.payload.property);

                if(propertyIndex > -1){
                    newState.ticketsData[ticketIndex]["properties"][propertyIndex]['value'] = action.payload.value;
                    newState.ticketsData[ticketIndex]["properties"][propertyIndex]['ticket_property_id'] = action.payload.ticketPropertyId;
                }
                else{
                    console.log("trackerInstance: err7")
                    // let tempObj ={
                    //     ticket_property_id: 9999,
                    //     ticket_id: action.payload.ticketId,
                    //     value: action.payload.value,
                    //     column_name: action.payload.property,
                    //     tracker_column_id: action.payload.tracker_column_id
                    // };
                    
                    // state.ticketsData[ticketIndex]["properties"].push(tempObj);
                }
            }
            else
                console.log("trackerInstance: err6")

            console.log("ticketsDataReducer ADD_CELL_TICKET_PROPERTY_ID: ", newState);
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

const getTicketIndexById = (state, ticketId) => {
    return state.ticketsData.findIndex(
        ticket => (ticket.ticket_id === ticketId)
    );
}

const getPropertyIndexByColumnName = (state, ticketIndex, columnName) => {
    return state.ticketsData[ticketIndex]["properties"].findIndex(
        prop => (prop.column_name === columnName)
    )
}

/**
 * should call to ticket updating API endpoint
 */
const updateTicketData = (state, ticketPropertyId, data, metadata) => {
    console.log("ticketData updateTicketData - saveToDB", data);
    // let response = ticketAPIobj.updateTicketPropery(ticketPropertyId, data);

    // let state = {} // get the actual state, update ticket property id
    let ticketIndex = getTicketIndexById(state, metadata.ticketId);

    if(ticketIndex > -1){
        let propertyIndex = state.ticketsData[ticketIndex]["properties"].findIndex(
            prop => (prop.column_name === metadata.propertyName)
        )

        if ( metadata.newProp ) { // new property
            let tempObj ={
                ticket_property_id: ticketPropertyId,
                ticket_id: metadata.ticketId,
                value: data.value,
                column_name: metadata.propertyName,
                tracker_column_id: data.tracker_column_id
            };
            
            state.ticketsData[ticketIndex]["properties"].push(tempObj);
            return state;    
        }
        else{
            // console.log("trackerInstance: update ticketIndex err1")
            state.ticketsData[ticketIndex]["properties"][propertyIndex]['value'] = data.value;
            return state;
        }
    }
    else{
        console.log("trackerInstance: update ticketIndex err1")
    }

    // return state
}


export default ticketsDataReducer