import { connect } from 'react-redux'
//import { toggleTodo } from '../actions'
import Pet2 from '../components/pet2'
//import TodoList from '../components/TodoList'
//import { VisibilityFilters } from '../actions'

const getVisibleTodos = (pets, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return pets
    
    default:
      //throw new Error('Unknown filter: ' + filter)
      return pets
  }
}

const mapStateToProps = state => (
	console.log("mstProps")
)

const mapDispatchToProps = dispatch => (
	console.log("dispatchProps")
)


/*const mapStateToProps = state => ({
  //pets: getVisibleTodos(state.pets, state.visibilityFilter)
  pets: getVisibleTodos(state, state)
})

/*const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})*/

export default connect(
	//()=> console.log("inside"),
	//()=> console.log("in2")
	mapStateToProps,
	mapDispatchToProps
)(Pet2)
