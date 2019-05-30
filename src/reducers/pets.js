//import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'

/*export default combineReducers({
  todos,
  visibilityFilter
})*/

/*function reducer(state, action) {
    console.log('reducer', state, action);
    return state;
}
const store = createStore(reducer);*/

const PetReducer = (state, action) => {
    console.log("PetReducer: state: ", state, "\naction: ", action)
    let newState = {};

    switch (action.type) {
        case 'UPDATE_PET_DETAIL':
            //let newState={}
            newState = {
                ...state,
                tickets: state.tickets.map(record => {
                    if (parseInt(record.ticket_id) == action.payload.identifier) {
                        let data = {};
                        data[action.payload.attribute] = action.payload.value;
                        return {
                            ...record,
                            ...data
                        }
                    } else
                        return record;
                })
            }
            console.log("petReducer_UPDATE_PET_DETAIL: ", newState);
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

export default PetReducer