import {
  RECEIVE_ATTEND_REQUEST,
  RECEIVE_ATTEND_REQUESTS,
  REMOVE_ATTEND_REQUEST,
  CLEAR_ATTEND_REQUESTS
} from "../actions/attendRequestActions"

const attendRequestsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_ATTEND_REQUEST:
      return Object.assign(newState, action.attendRequest)
    case RECEIVE_ATTEND_REQUESTS:
      return action.attendRequests
    case REMOVE_ATTEND_REQUEST:
      delete newState[action.id]
      return newState
    case CLEAR_ATTEND_REQUESTS:
      return {}
    default:
      return oldState
  }
}

export default attendRequestsReducer
