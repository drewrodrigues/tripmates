import {
  RECEIVE_FRIEND,
  RECEIVE_FRIENDS,
  REMOVE_FRIEND
} from "../actions/friendActions"

const friendsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_FRIEND:
      return Object.assign(newState, action.friend)
    case RECEIVE_FRIENDS:
      return action.friends
    case REMOVE_FRIEND:
      delete newState[action.id]
      return newState
    default:
      return oldState
  }
}

export default friendsReducer
