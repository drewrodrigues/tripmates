import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
  CLEAR_MESSAGES
} from "../actions/messageActions"

const messagesreducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_MESSAGE:
      return Object.assign(newState, action.message)
    case RECEIVE_MESSAGES:
      return action.messages
    case REMOVE_MESSAGE:
      delete newState[action.id]
      return newState
    case CLEAR_MESSAGES:
      return {}
    default:
      return oldState
  }
}

export default messagesreducer