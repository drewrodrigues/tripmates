import {
  RECEIVE_FRIEND_REQUEST,
  RECEIVE_FRIEND_REQUESTS,
  REMOVE_FRIEND_REQUEST
} from "../actions/friendRequestActions"

const friendRequestsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_FRIEND_REQUEST:
      return Object.assign(newState, action.friendRequest)
    case RECEIVE_FRIEND_REQUESTS:
      return action.friendRequests
    case REMOVE_FRIEND_REQUEST:
      delete newState[action.id]
      return newState
    default:
      return oldState
  }
}

export default friendRequestsReducer
