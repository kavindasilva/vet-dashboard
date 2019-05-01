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
    console.log("Reducer: state: ", state, "\naction: ", action)
    switch (action.type) {
        case 'VIEWALL':
            console.log("reducer_VIEW") 
            return state;




        case 'ADD_TODO':
            console.log("reducer_ADDTODO")
            return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
            ]


        default:
            return state
        }
  }
  
  export default PetReducer
  