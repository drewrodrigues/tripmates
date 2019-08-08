import { combineReducers } from 'redux'
import tripsReducer from './tripsReducer'
import usersReducer from './usersReducer'
import friendRequestsReducer from './friendRequestsReducer'
import friendsReducer from "./friendsReducer"

export default combineReducers({
  friendRequests: friendRequestsReducer,
  friends: friendsReducer,
  trips: tripsReducer,
  users: usersReducer
})