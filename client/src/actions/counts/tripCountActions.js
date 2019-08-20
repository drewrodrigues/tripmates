export const RECEIVE_TRIPS_COUNTS = "RECEIVE_TRIPS_COUNTS"
export const RECEIVE_TRIP_COUNTS = "RECEIVE_TRIP_COUNTS"
export const INCREMENT_SPACES_LEFT = "INCREMENT_SPACES_LEFT"
export const DECREMENT_SPACES_LEFT = "DECREMENT_SPACES_LEFT"
export const COMPUTE_SPACES_FROM_ATTENDANCES = "COMPUTE_SPACES_FROM_ATTENDANCES"

export const receiveTripsCounts = tripsCounts => ({
  type: RECEIVE_TRIPS_COUNTS,
  tripsCounts
})

export const receiveTripCounts = tripCounts => ({
  type: RECEIVE_TRIP_COUNTS,
  tripCounts
})

export const incrementSpacesLeft = tripId => ({
  type: INCREMENT_SPACES_LEFT,
  tripId
})

export const decrementSpacesLeft = tripId => ({
  type: DECREMENT_SPACES_LEFT,
  tripId
})