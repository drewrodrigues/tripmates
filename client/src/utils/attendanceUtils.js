import axios from 'axios'

export const acceptAttendance = attendRequestId => {
  return axios({
    method: "post",
    url: "/api/attendances",
    data: { id: attendRequestId }
  })
}

export const getAttendances = tripId => {
  return axios({
    method: "get",
    url: `/api/trips/${tripId}/attendances`
  })
}

export const deleteAttendance = id => {
  return axios({
    method: "delete",
    url: `/api/attendances/${id}`
  })
}