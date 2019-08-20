import {
  RECEIVE_TRIPS_COUNTS,
  RECEIVE_TRIP_COUNTS,
  INCREMENT_SPACES_LEFT,
  DECREMENT_SPACES_LEFT,
}from "../../actions/counts/tripCountActions"

const tripCountsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_TRIPS_COUNTS:
      return action.tripsCounts
    case RECEIVE_TRIP_COUNTS:
      return Object.assign(newState, action.tripCounts)
    case INCREMENT_SPACES_LEFT:
      newState[action.tripId].spacesLeft++
      return newState
    case DECREMENT_SPACES_LEFT:
      newState[action.tripId].spacesLeft--
      return newState
    default:
      return oldState
  }
}

export default tripCountsReducer