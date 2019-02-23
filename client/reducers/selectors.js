// [{...tripDetails, ...creatorDetails}]
export const allTripsSelector = state => {
  const result = [];
  Object.values(state.entities.trips).forEach(trip => {
    let thisTrip = trip
    thisTrip.creator = state.entities.users[trip.creator_id]
    result.push(thisTrip);
  });
  return result;
};

export const selectTripById = (trips, id) => {
  return trips[id];
}