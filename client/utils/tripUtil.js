export const createTrip = (userId, trip) => {
  return $.ajax({
    type: "POST",
    url: `api/users/${userId}/trips`,
    data: {trip: trip},
    dataType: "JSON"
  });
};

export const fetchMyTrips = userId => {
  return $.ajax({
    type: "GET",
    url: `api/users/${userId}/trips`,
    dataType: "JSON"
  });
};

export const fetchTrip = id => {
  return $.ajax({
    type: "GET",
    url: `api/trips/${id}`,
    dataType: "JSON"
  });
};

export const deleteTrip = trip => {
  return $.ajax({
    type: "DELETE",
    url: `api/trips/${trip.id}`,
    dataType: "JSON"
  });
};

export const updateTrip = trip => {
  return $.ajax({
    type: "PUT",
    url: `api/trips/${trip.id}`,
    data: {trip: trip},
    dataType: "JSON"
  });
};

window.fetchMyTrips = fetchMyTrips;
window.fetchTrip = fetchTrip;
window.deleteTrip = deleteTrip;
window.updateTrip = updateTrip;