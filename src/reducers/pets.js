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
            return {
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

/*   
        case 'VIEWALL':
            console.log("reducer_VIEW") 
            return state;
            
        case 'UPDATEPET':
            console.log("reducer_UPDATEPET") 
            //let arrIndex = state.petAdmission.findIndex( item => item.id == action.id );
            //let state2= [...state];
            //console.log("state2: ",state2);
        
            return  [...state.petAdmission], {  "id":'4' , "name":"TommyStt" , 'speci':"Dog" , 'gender':"Female" , 'years':'2' , 'symptoms':["Cold"] , 'admittedDate':"2019-04-03" } ;

        case 'VIEWNEW':
            console.log("reducer_VIEWNEW") 
            return { 
                petAdmission:[ 
                    { "id":'3' , "name":"PeterStt" , 'speci':"Bird" , 'gender':"Male" , 'years':'1' , 'symptoms':["Sleeping"] , 'admittedDate':"2019-04-03" },
                    { "id":'4' , "name":"TommyStt" , 'speci':"Dog" , 'gender':"Female" , 'years':'2' , 'symptoms':["Cold"] , 'admittedDate':"2019-04-03" }
            
                ]
             };


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

*/
        default:
            return state
        }
  }
  
  export default PetReducer
  