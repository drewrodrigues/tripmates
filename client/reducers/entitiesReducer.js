import { combineReducers } from 'redux';
import tripsReducer from './tripsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  trips: tripsReducer,
  users: usersReducer
});