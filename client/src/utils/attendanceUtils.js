import axios from 'axios'

export const acceptAttendance = attendRequestId => {
  return axios({
    method: "post",
    url: "/api/attendances",
    data: { id: attendRequestId }
  })
}

export const deleteAttendance = id => {
  return axios({
    method: "delete",
    url: `/api/attendances/${id}`
  })
}