export const isLeaderOfTrip = (state, trip) => {
  return state.session.id === trip.creatorId
}