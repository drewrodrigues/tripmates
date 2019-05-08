import * as APIUtil from '../utils/tripUtil'

import { receiveUser, receiveUsers } from './userActions'

export const RECEIVE_TRIP  = "RECEIVE_TRIP"
export const RECEIVE_TRIPS = "RECEIVE_TRIPS"
export const REMOVE_TRIP = "REMOVE_TRIP"

export const receiveTrip = trip => {
  return {type: RECEIVE_TRIP, trip}
}

export const receiveTrips = trips => {
  return {type: RECEIVE_TRIPS, trips}
}

export const removeTrip = trip => {
  return {type: REMOVE_TRIP, trip}
}

export const retrieveMyTrips = userId => dispatch => {
  return APIUtil.fetchMyTrips(userId)
    .then(res => {
      dispatch(receiveTrips(res.trips))
      dispatch(receiveUsers(res.users))
    })
}

export const getTripById = id => dispatch => {
  return APIUtil.fetchTrip(id)
    .then(res => {
      dispatch(receiveTrips(res.trip))
      dispatch(receiveUsers(res.user))
      return res
    })
}

export const createTrip = trip => dispatch => {
  return APIUtil.createTrip(trip)
    .then(res => {
      dispatch(receiveTrip(res.trip))
      dispatch(receiveUser(res.user))
      return res
    })
}

export const updateTrip = trip => dispatch => {
  return APIUtil.updateTrip(trip)
    .then(trip => {
      dispatch(receiveTrip(trip))
      return trip
    })
}

export const deleteTrip = trip => dispatch => {
  return APIUtil.deleteTrip(trip)
    .then(() => dispatch(removeTrip(trip)))
}