
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
            // get tracker's index by tracker ID
            let trackerIndex = state.ticketsData.findIndex(
                    tracker => (tracker.ticketId === action.payload.ticketTicketId)
                );

            if(trackerIndex >-1 ){
                newState.ticketsData[trackerIndex][action.payload.columnName].value = action.payload.value;

                updateTicketData( {
                    //columnName:action.payload.columnName,
                    //ticketId: action.payload.ticketTicketId,
                    value: action.payload.value,
                },
                action.payload.entryId
                );
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

const updateTicketData = (allData, entryId) => {
    console.log("ticketData updateTicketData - saveToDB", allData);
    ticketAPIobj.updateTicketPropery(allData, entryId);
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
                /*rootStore.dispatch({
                    type: 'FETCH_TICKETS_FROM_API',
                    payload: {
                        ticketData: response.data
                    }
                }) /* * /

            }
        ) /* */
}


export default ticketsDataReducer