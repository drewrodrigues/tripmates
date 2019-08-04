import {
  RECEIVE_TRIP,
  RECEIVE_TRIPS,
  REMOVE_TRIP,
  CLEAR_TRIPS
} from '../actions/tripActions'

const tripsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_TRIP:
      return Object.assign(newState, action.trip)
    case RECEIVE_TRIPS:
      return Object.assign({}, action.trips)
    case REMOVE_TRIP:
      delete newState[action.trip]
      return newState
    case CLEAR_TRIPS:
      return {}
    default:
      return oldState
  }
}

export default tripsReducer