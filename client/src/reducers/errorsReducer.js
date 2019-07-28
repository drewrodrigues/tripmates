import { combineReducers } from 'redux'
import sessionErrorsReducer from './errors/sessionErrorsReducer'
import tripErrorsReducer from './errors/tripErrorsReducer'
import userErrorsReducer from './errors/userErrorsReducer'

export default combineReducers({
  sessionErrors: sessionErrorsReducer,
  tripErrors: tripErrorsReducer,
  userErrors: userErrorsReducer
})