import { selectTripById } from "./selectors"

export const isLeaderOfTrip = (state, trip) => {
  if (typeof trip == "object") {
    return state.session.id == trip.creatorId
  } else {
    const tripWithCreator = selectTripById(state, trip)
    return state.session.id == tripWithCreator.creatorId // id
  }
}

export const canSeeResourcesOfTrip = (state, tripId) => {
  const trip = selectTripById(state, tripId)
  const currentUserId = state.session.id
  if (isLeaderOfTrip(state, trip)) {
    return true
  } else {
    return Object.values(state.entities.attendances).find(attendance => {
      return attendance.userId == currentUserId && attendance.tripId == tripId
    })
  }
}