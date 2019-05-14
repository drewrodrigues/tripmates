import { combineReducers } from 'redux'
import sessionErrorsReducer from './errors/sessionErrorsReducer'

export default combineReducers({
  sessionErrors: sessionErrorsReducer
})