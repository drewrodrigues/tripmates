import { RECEIVE_TRIP, RECEIVE_TRIPS, REMOVE_TRIP } from "../actions/tripActions"

const tripsReducer = (state = {}, action) => {
  Object.freeze(state)

  let newState
  switch (action.type) {
    case REMOVE_TRIP:
      newState = Object.assign({}, state)
      delete newState[action.trip.id]
      return newState
    case RECEIVE_TRIP:
      newState = Object.assign({}, state, action.trip)
      return newState
    case RECEIVE_TRIPS:
      return action.trips
    default:
      return state
  }
}

export default tripsReducer