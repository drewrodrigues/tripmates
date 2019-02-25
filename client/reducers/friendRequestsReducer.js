import { 
  RECEIVE_FRIEND_REQUEST,
  RECEIVE_FRIEND_REQUESTS,
  REMOVE_FRIEND_REQUEST
} from "../actions/friendRequestActions"

const friendRequestsReducers = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_FRIEND_REQUEST:
      return Object.assign({}, state, action.friendRequest)
    case RECEIVE_FRIEND_REQUESTS:
      return Object.assign({}, state, action.friendRequests)
    case REMOVE_FRIEND_REQUEST:
      let newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

export default friendRequestsReducers