import axios from 'axios'

export const createTrip = formData => {
  return axios({
    method: "POST",
    url: `/api/trips`,
    data: formData,
    contentType: false,
    processData: false
  })
}

export const fetchMyTrips = userId => {
  return axios({
    method: "GET",
    url: `/api/users/${ userId }/trips`
  })
}

export const fetchTrip = id => {
  return axios({
    method: "GET",
    url: `/api/trips/${ id }`
  })
}

export const deleteTrip = id => {
  return axios({
    method: "DELETE",
    url: `/api/trips/${ id }`
  })
}

export const updateTrip = formData => {
  return axios({
    method: "PUT",
    url: `/api/trips/${ formData.get('trip[id]') }`,
    data: formData,
    contentType: false,
    processData: false
  })
}