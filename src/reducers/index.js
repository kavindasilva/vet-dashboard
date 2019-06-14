
import { combineReducers } from 'redux'
import PetReducer from './pets'
import MetaReducer from './meta'

export default combineReducers({
  PetReducer,
  MetaReducer
})