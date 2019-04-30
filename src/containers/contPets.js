
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const Pet2 = ({ dispatch }) => {
    let input
  
    return (
    <div>
        <div>

        </div>
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodo(input.value))
                input.value = ''
            }}>
            <input ref={node => input = node} />
            <button type="submit">
                Add Todo
            </button>
            </form>
        </div>
    </div>
    )
  }
  
  export default connect()(Pet2)