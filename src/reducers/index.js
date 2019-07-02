
import { combineReducers } from 'redux'

import PetReducer from './pets'
import MetaReducer from './meta'
import PhoenixReducer from './phoenix'
import TrackInstaReducer from "../reducers/trackInstance"
import TrackConfigReducer from "../reducers/trackConfig"

import UserConfigReducer from "../reducers/userConfig"

export default combineReducers({
  PetReducer,
  MetaReducer,
  PhoenixReducer,
  TrackInstaReducer,
  TrackConfigReducer,

  UserConfigReducer,

})