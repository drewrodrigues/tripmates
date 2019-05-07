export const createTrip = formData => {
  return $.ajax({
    type: "POST",
    url: `/api/trips`,
    data: formData,
    dataType: "JSON",
    contentType: false,
    processData: false
  })
}

export const fetchMyTrips = userId => {
  return $.ajax({
    type: "GET",
    url: `/api/users/${userId}/trips`,
    dataType: "JSON"
  })
}

export const fetchTrip = id => {
  return $.ajax({
    type: "GET",
    url: `/api/trips/${id}`,
    dataType: "JSON"
  })
}

export const deleteTrip = id => {
  return $.ajax({
    type: "DELETE",
    url: `/api/trips/${id}`,
    dataType: "JSON"
  })
}

export const updateTrip = trip => {
  return $.ajax({
    type: "PUT",
    url: `/api/trips/${trip.id}`,
    data: {trip: trip},
    dataType: "JSON"
  })
}

window.fetchMyTrips = fetchMyTrips
window.fetchTrip = fetchTrip
window.deleteTrip = deleteTrip
window.updateTrip = updateTrip