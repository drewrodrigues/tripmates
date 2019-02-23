import { combineReducers } from 'redux';
import tripsReducer from './trips_reducer';
import usersReducer from './users_reducer';

export default combineReducers({
  trips: tripsReducer,
  users: usersReducer
});