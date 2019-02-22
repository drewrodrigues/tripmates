import { combineReducers } from 'redux';
import tripReducer from './trips_reducer';

export default combineReducers({
  trips: tripReducer
});