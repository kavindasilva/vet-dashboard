let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const viewPet = () =>({
    type: 'VIEWALL',

})

export const updatePet = data => ({
  type: 'UPDATEPET',
  id: data.id,
  details: data
})

export const viewNewPet = () =>({
  type: 'VIEWNEW',

})


export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export function increment() {
    return { type: INCREMENT };
}

/*export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})*/

export const toggleTodo = id => ({
  type: 'INCREMENT2',
  id:0
})

/*export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}*/
