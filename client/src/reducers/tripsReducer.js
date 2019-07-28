import {
  RECEIVE_TRIP,
  RECEIVE_TRIPS,
  REMOVE_TRIP
} from '../actions/tripActions'

const tripsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_TRIP:
      return Object.assign(newState, action.trip)
    case RECEIVE_TRIPS:
      return Object.assign(newState, action.trips)
    case REMOVE_TRIP:
      delete newState[action.id]
      return newState
    default:
      return oldState
  }
}

export default tripsReducer