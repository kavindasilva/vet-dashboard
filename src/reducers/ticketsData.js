
import { isUndefined } from "util";

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
            // get tracker's index by tracker ID
            let trackerIndex = state.ticketsData.findIndex( tracker=> (
                tracker.ticketId === action.payload.trackerInstanceId
            ) );

            if(trackerIndex >-1 ){
                // get tracker data column's index by column ID
                let columnIndex = newState.ticketsData[trackerIndex].columnData.findIndex( column=> (
                    column.name === action.payload.columnName
                    //column.columnId === action.payload.columnId
                ) );

                if(columnIndex >-1 ){
                    newState.ticketsData[trackerIndex].columnData[columnIndex].value = action.payload.value;
                }
                else
                    console.log("trackerInstance: err1")                
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
        

        case "GET_INSTANCE_FROM_DB": // get instance data from DB
            newState = {
                ...state,
                ticketsData: action.payload.data,
            }

            console.log("TrackConfigReducer GET_INSTANCE_FROM_DB: ", newState);
            return newState;


        default:
            console.log("ticketsDataReducer default: ", newState0);
            return state;
    }

}


export default ticketsDataReducer