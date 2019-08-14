import * as AttendanceUtils from "../utils/attendanceUtils"
import { removeAttendRequest } from "./attendRequestActions"

export const RECEIVE_ATTENDANCE = "RECEIVE_ATTENDANCE"
export const RECEIVE_ATTENDANCES = "RECEIVE_ATTENDANCES"
export const REMOVE_ATTENDANCE = "REMOVE_ATTENDANCE"
export const CLEAR_ATTENDANCES = "CLEAR_ATTENDANCES"

export const receiveAttendance = attendance => {
  return {
    type: RECEIVE_ATTENDANCE,
    attendance
  }
}

export const receiveAttendances = attendances => {
  return {
    type: RECEIVE_ATTENDANCES,
    attendances
  }
}

export const removeAttendance = attendance => {
  return {
    type: REMOVE_ATTENDANCE,
    attendance
  }
}

export const clearAttendances = () => {
  return {
    type: CLEAR_ATTENDANCES
  }
}

export const acceptAttendance = attendRequestId => dispatch => {
  return AttendanceUtils.acceptAttendance(attendRequestId)
    .then(res => {
      dispatch(receiveAttendance(res.data))
      dispatch(removeAttendRequest(attendRequestId))
    })
    .catch(err => console.log(err.response.data))
}

export const getAttendances = tripId => dispatch => {
  return AttendanceUtils.getAttendances(tripId)
    .then(res => dispatch(receiveAttendances(res.data)))
    .catch(err => console.log(err.response.data))
}

export const deleteAttendance = id => dispatch => {
  return AttendanceUtils.deleteAttendance(id)
    .then(() => dispatch(removeAttendance(id)))
    .catch(err => console.log(err.response.data))
}