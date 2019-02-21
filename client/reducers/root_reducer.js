import { combineReducers } from 'redux';
import entityReducer from './entity_reducer';

export default combineReducers({
  entities: entityReducer
});