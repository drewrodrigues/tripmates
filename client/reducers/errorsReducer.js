import { combineReducers } from 'redux'
import sessionErrorsReducer from './errors/sessionErrorsReducer'
import userErrorsReducer from './errors/userErrorsReducer'

export default combineReducers({
  sessionErrors: sessionErrorsReducer,
  userErrors: userErrorsReducer
})