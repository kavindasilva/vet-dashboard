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

    switch (action.type) {
        case 'UPDATE_PET_DETAIL':
            let newState={}
            newState= {
                ...state,
                admissions: state.admissions.map(record => {
                    if (record.id === action.payload.identifier) {
                        let data = {};
                        data[action.payload.attribute] = action.payload.value;
                        return {
                            ...record,
                            ...data
                        }
                    }
                    else
                        return record;
                })
            }
            console.log("petReducer_UPDATE_PET_DETAIL: ", newState);
            return newState;
        
        default:
            return state
    }
  }
  
  export default PetReducer
  