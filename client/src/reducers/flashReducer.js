import {
  RECEIVE_FLASH,
  CLEAR_FLASH
} from "../actions/flashActions"

const friendRequestsReducer = (oldState = [], action) => {
  Object.freeze(oldState)

  switch (action.type) {
    case RECEIVE_FLASH:
      return action.messages
    case CLEAR_FLASH:
      return []
    default:
      return oldState
  }
}

export default friendRequestsReducer
