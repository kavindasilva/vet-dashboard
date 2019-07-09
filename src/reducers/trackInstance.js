
import { isUndefined } from "util";

const TrackInstaReducer = (state, action) => {
    console.log("TrackInstaReducer: state: ", state, "\naction: ", action)
    let newState0 = {
        TrackerInstaReducer:{
            instanceData: false,
        }
    };

    if(state===undefined || isUndefined(state))
        state=null;

    let newState = { ...state };

    switch (action.type) {
        case 'UPDATE_CELL_VALUE': // update cell value changes
            // get tracker's index
            let trackerIndex = state.instanceData.findIndex( tracker=> (
                tracker.id === action.payload.trackerInstanceId
            ) );

            if(trackerIndex >-1 ){
                // get tracker data column's index
                let columnIndex = newState.instanceData[trackerIndex].data.findIndex( column=> (
                    column.columnId === action.payload.columnId
                ) );

                if(columnIndex >-1 ){
                    newState.instanceData[trackerIndex].data[columnIndex].value = action.payload.value;
                }
                else
                    console.log("trackerInstance: err1")                
            }
            else
                console.log("trackerInstance: err1")

            console.log("TrackInstaReducer UPDATE_CELL_VALUE: ", newState);
            return newState;

        case 'GET_HUBSPOT_TICKETS': // get ticket data from hubspot
            newState = {
                ...state,
                hubspotTickets: action.payload.ticketData.map(
                    record => { return record }
                )
            };

            console.log("TrackInstaReducer GET_HUBSPOT_TICKETS: ", newState);
            return newState;
        
        case "GET_INSTANCE_FROM_DB": // get instance data from DB
            newState = {
                ...state,
                instanceData: action.payload.data,
            }

            console.log("TrackConfigReducer GET_INSTANCE_FROM_DB: ", newState);
            return newState;

        default:
            console.log("TrackInstaReducer default: ", newState0);
            return state;
    }

}


export default TrackInstaReducer