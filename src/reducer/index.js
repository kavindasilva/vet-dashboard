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
        case 'VIEWALL':
            console.log("reducer_VIEW") 
            return state;
            
        case 'UPDATEPET':
            console.log("reducer_UPDATEPET") 
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
            console.log("reducer_DEFAULT")
            return state
        }
  }
  
  export default PetReducer
  