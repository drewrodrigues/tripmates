export const allTripsSelector = trips => {
  const result = [];
  Object.values(trips).forEach(value => {
    result.push(value);
  });
  return result;
};

export const selectTripById = (trips, id) => {
  return trips[id];
}