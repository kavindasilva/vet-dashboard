
import { combineReducers } from 'redux'

import MetaReducer from './meta'
import PhoenixReducer from './phoenix'
import ticketsDataReducer from "../reducers/ticketsData"
import TrackConfigReducer from "../reducers/trackConfig"
import PipeReducer from "../reducers/pipelineConfig"

import UserConfigReducer from "../reducers/userConfig"

export default combineReducers({

  MetaReducer,
  PhoenixReducer,

  ticketsDataReducer,
  TrackConfigReducer,
  PipeReducer,

  UserConfigReducer,

})