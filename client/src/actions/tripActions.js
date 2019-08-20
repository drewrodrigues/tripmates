import * as APIUtil from "../utils/tripUtil"

import { receiveUser, receiveUsers } from "./userActions"
import { receiveAttendRequest, receiveAttendRequests } from "./attendRequestActions"
import { receiveAttendance, receiveAttendances } from "./attendanceActions";

export const RECEIVE_TRIP = "RECEIVE_TRIP"
export const RECEIVE_TRIPS = "RECEIVE_TRIPS"
export const REMOVE_TRIP = "REMOVE_TRIP"
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS"
export const CLEAR_TRIP_ERRORS = "CLEAR_TRIP_ERRORS"
export const CLEAR_TRIPS = "CLEAR_TRIPS"

export const receiveTrip = trip => {
  return { type: RECEIVE_TRIP, trip }
}

export const receiveTrips = trips => {
  return { type: RECEIVE_TRIPS, trips }
}

export const removeTrip = trip => {
  return { type: REMOVE_TRIP, trip }
}

export const receiveTripErrors = errors => ({
  type: RECEIVE_TRIP_ERRORS,
  errors
})

export const clearTripErrors = () => ({ type: CLEAR_TRIP_ERRORS })
export const clearTrips = () => ({ type: CLEAR_TRIPS })

export const retrieveMyTrips = userId => dispatch => {
  return APIUtil.fetchMyTrips(userId).then(res => {
    dispatch(receiveTrips(res.data.trips))
    dispatch(receiveUsers(res.data.users))
  })
}

export const searchTrips = query => dispatch => {
  return APIUtil.searchTrips(query).then(res => {
    dispatch(receiveTrips(res.data.trips))
    dispatch(receiveUsers(res.data.users))
    dispatch(receiveAttendRequests(res.data.attendRequests))
    dispatch(receiveAttendances(res.data.attendances))
  })
}

export const getTripById = id => dispatch => {
  return APIUtil.fetchTrip(id).then(res => {
    dispatch(receiveTrips(res.data.trip))
    dispatch(receiveUsers(res.data.user))
    dispatch(receiveAttendRequest(res.data.attendRequest))
    dispatch(receiveAttendance(res.data.attendance))
    return res.data
  })
}

export const createTrip = trip => dispatch => {
  return APIUtil.createTrip(trip)
    .then(res => {
      dispatch(receiveTrip(res.data.trip))
      dispatch(receiveUser(res.data.user))
      return res.data
    })
    .catch(error => {
      dispatch(receiveTripErrors(error.response.data))
      return Promise.reject(error.response.data)
    })
}

export const updateTrip = trip => dispatch => {
  return APIUtil.updateTrip(trip)
    .then(response => {
      dispatch(receiveTrip(response.data.trip))
      return response.data
    })
    .catch(error => {
      const errorData = error.response.data
      dispatch(receiveTripErrors(errorData))
      return Promise.reject(errorData)
    })
}

export const deleteTrip = trip => dispatch => {
  return APIUtil.deleteTrip(trip).then(() => dispatch(removeTrip(trip)))
}
