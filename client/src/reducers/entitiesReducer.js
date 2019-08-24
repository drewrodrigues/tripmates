import { combineReducers } from "redux"
import tripsReducer from "./tripsReducer"
import usersReducer from "./usersReducer"
import friendRequestsReducer from "./friendRequestsReducer"
import friendsReducer from "./friendsReducer"
import attendRequestsReducer from "./attendRequestsReducer"
import attendancesReducer from "./attendancesReducer"
import messagesReducer from "./messagesReducer"
import itineraryItemsReducer from './itineraryItemsReducer'

export default combineReducers({
  attendRequests: attendRequestsReducer,
  attendances: attendancesReducer,
  friendRequests: friendRequestsReducer,
  friends: friendsReducer,
  itinerary: itineraryItemsReducer,
  messages: messagesReducer,
  trips: tripsReducer,
  users: usersReducer
})
