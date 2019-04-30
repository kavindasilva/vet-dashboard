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

const PetReducer = (state = [], action) => {
    switch (action.type) {
        case 'VIEW':
            return state;

        case 'ADD_TODO':
            return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
            ]

        case 'TOGGLE_TODO':
            return state.map(todo =>
            (todo.id === action.id)
                ? {...todo, completed: !todo.completed}
                : todo
            )
        default:
            return state
        }
  }
  
  export default PetReducer
  