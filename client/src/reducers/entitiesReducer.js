import { combineReducers } from 'redux'
import tripsReducer from './tripsReducer'
import usersReducer from './usersReducer'
import friendRequestsReducer from './friendRequestsReducer'

export default combineReducers({
  trips: tripsReducer,
  users: usersReducer,
  friendRequests: friendRequestsReducer
})