export const allTripsSelector = trips => {
  const result = [];
  Object.values(trips).forEach(value => {
    result.push(value);
  });
  return result;
};