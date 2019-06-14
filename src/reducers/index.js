
import { combineReducers } from 'redux'
import PetReducer from './pets'
import MetaReducer from './meta'
import PhoenixReducer from './phoenix'

export default combineReducers({
  PetReducer,
  MetaReducer,
  PhoenixReducer,
})