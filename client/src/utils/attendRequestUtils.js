import axios from "axios"

export const createAttendRequest = tripId => {
  return axios({
    method: "post",
    url: `/api/trips/${tripId}/attend_requests`
  })
}

export const deleteAttendRequest = id => {
  return axios({
    method: "delete",
    url: `/api/attend_requests/${id}`
  })
}

export const getAttendRequests = tripId => {
  return axios({
    method: "get",
    url: `/api/trips/${tripId}/attend_requests`
  })
}
