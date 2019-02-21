import { combineReducers } from 'redux';
import tripReducer from './trip_reducer';

export default combineReducers({
  trips: tripReducer
});