export const isLeaderOfTrip = (state, trip) => {
  if (typeof trip == 'object') {
    return state.session.id == trip.creatorId
  } else {
    return state.session.id == trip // id
  }
}