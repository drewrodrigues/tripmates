import * as APIUtil from '../utils/trip_util';

export const RECEIVE_TRIP  = "RECEIVE_TRIP";
export const RECEIVE_TRIPS = "RECEIVE_TRIPS";

export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
});

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

export const retrieveMyTrips = userId => dispatch => {
  return APIUtil.fetchMyTrips(userId)
    .then(res => dispatch(receiveTrips(res)));
};

export const createTrip = (userId, trip) => dispatch => {
  return APIUtil.createTrip(userId, trip)
    .then(res => dispatch(receiveTrip(res)));
};