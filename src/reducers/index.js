
import { combineReducers } from 'redux'

import PetReducer from './pets'
import MetaReducer from './meta'
import PhoenixReducer from './phoenix'
import ticketsDataReducer from "../reducers/ticketsData"
import TrackConfigReducer from "../reducers/trackConfig"

import UserConfigReducer from "../reducers/userConfig"

export default combineReducers({
  PetReducer,
  MetaReducer,
  PhoenixReducer,
  ticketsDataReducer,
  TrackConfigReducer,

  UserConfigReducer,

})