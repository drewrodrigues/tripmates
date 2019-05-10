export const isAdminOfTrip = (state, trip) => {
  return state.session.id === trip.creatorId
}