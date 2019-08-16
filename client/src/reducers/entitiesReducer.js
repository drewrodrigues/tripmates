import { combineReducers } from "redux"
import tripsReducer from "./tripsReducer"
import usersReducer from "./usersReducer"
import friendRequestsReducer from "./friendRequestsReducer"
import friendsReducer from "./friendsReducer"
import attendRequestsReducer from "./attendRequestsReducer"
import attendancesReducer from "./attendancesReducer"

export default combineReducers({
  attendRequests: attendRequestsReducer,
  attendances: attendancesReducer,
  friendRequests: friendRequestsReducer,
  friends: friendsReducer,
  trips: tripsReducer,
  users: usersReducer
})
