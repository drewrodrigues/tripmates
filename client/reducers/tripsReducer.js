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
      newState[action.trip.id] = action.trip
      return newState
    case RECEIVE_TRIPS:
      return action.trips
    case REMOVE_TRIP:
      delete newState[action.id]
      return newState
    default:
      return oldState
  }
}

export default tripsReducer