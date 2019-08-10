import axios from "axios"

export const createAttendRequest = tripId => {
  return axios({
    method: "post",
    url: "/api/attend_requests",
    data: { "attend_request": { "trip_id": tripId } }
  })
}

export const deleteAttendRequest = id => {
  return axios({
    method: "delete",
    url: `/api/attend_requests/${id}`
  })
}

export const getAttendRequests = () => {
  return axios({
    method: "get",
    url: "/api/attend_requests"
  })
}