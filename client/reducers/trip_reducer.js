import { RECEIVE_TRIP, RECEIVE_TRIPS } from "../actions/trip_actions";

const tripReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TRIP:
      return state; // FIXME: change this
    case RECEIVE_TRIPS:
      return action.trips
    default:
      return state;
  };
};

export default tripReducer;