import { combineReducers } from 'redux';
import entityReducer from './entitiesReducer';
import sessionReducer from './sessionsReducer';

export default combineReducers({
  entities: entityReducer,
  session: sessionReducer
});