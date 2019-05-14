import { combineReducers } from 'redux'
import errorsReducer from './errorsReducer'
import entityReducer from './entitiesReducer'
import sessionReducer from './sessionsReducer'

export default combineReducers({
  errors: errorsReducer,
  entities: entityReducer,
  session: sessionReducer
})