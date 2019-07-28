import axios from 'axios'

export const createTrip = formData => {
  return axios({
    method: "POST",
    url: `/api/trips`,
    data: formData,
    dataType: "JSON",
    contentType: false,
    processData: false
  })
}

export const fetchMyTrips = userId => {
  return axios({
    method: "GET",
    url: `/api/users/${ userId }/trips`,
    dataType: "JSON"
  })
}

export const fetchTrip = id => {
  return axios({
    method: "GET",
    url: `/api/trips/${ id }`,
    dataType: "JSON"
  })
}

export const deleteTrip = id => {
  return axios({
    method: "DELETE",
    url: `/api/trips/${ id }`,
    dataType: "JSON"
  })
}

export const updateTrip = formData => {
  return axios({
    method: "PUT",
    url: `/api/trips/${ formData.get('trip[id]') }`,
    dataType: "JSON",
    data: formData,
    dataType: "JSON",
    contentType: false,
    processData: false
  })
}