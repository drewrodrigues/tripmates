import { combineReducers } from 'redux';
import entityReducer from './entities_reducer';
import sessionReducer from './sessions_reducer';

export default combineReducers({
  entities: entityReducer,
  session: sessionReducer
});