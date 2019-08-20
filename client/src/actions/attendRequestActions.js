import * as AttendRequestUtil from "../utils/attendRequestUtils"
import { receiveUsers } from "./userActions";

export const RECEIVE_ATTEND_REQUESTS = "RECEIVE_ATTEND_REQUESTS"
export const RECEIVE_ATTEND_REQUEST = "RECEIVE_ATTEND_REQUEST"
export const REMOVE_ATTEND_REQUEST = "REMOVE_ATTEND_REQUEST"
export const CLEAR_ATTEND_REQUESTS = "CLEAR_ATTEND_REQUESTS"

export const receiveAttendRequests = attendRequests => {
  return {
    type: RECEIVE_ATTEND_REQUESTS,
    attendRequests
  }
}

export const receiveAttendRequest = attendRequest => {
  return {
    type: RECEIVE_ATTEND_REQUEST,
    attendRequest
  }
}

export const removeAttendRequest = id => {
  return {
    type: REMOVE_ATTEND_REQUEST,
    id
  }
}

export const clearAttendRequests = () => {
  return {
    type: CLEAR_ATTEND_REQUESTS
  }
}

export const createAttendRequest = tripId => dispatch => {
  return AttendRequestUtil.createAttendRequest(tripId)
    .then(res => {
      dispatch(receiveAttendRequest(res.data))
    })
    .catch(err => {
      // TODO: handle errors with flash
      console.log("oh no")
      console.log(err.response.data)
    })
}

export const deleteAttendRequest = id => dispatch => {
  return AttendRequestUtil.deleteAttendRequest(id)
    .then(() => {
      dispatch(removeAttendRequest(id))
    })
    .catch(err => {
      // TODO: handle errors with flash
      console.log("oh no")
      console.log(err.response.data)
    })
}

export const getAttendRequests = tripId => dispatch => {
  return AttendRequestUtil.getAttendRequests(tripId)
    .then(res => {
      dispatch(receiveAttendRequests(res.data.attendRequests))
      dispatch(receiveUsers(res.data.users))
    })
    .catch(err => {
      // TODO: handle errors with flash
      console.log("oh no")
      console.log(err.response.data)
    })
}
