import { RECEIVE_TRIP, RECEIVE_TRIPS } from "../actions/trip_actions";

const tripReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TRIP:
      let newState = Object.assign({}, state, action.trip);
      return newState;
    case RECEIVE_TRIPS:
      return action.trips
    default:
      return state;
  };
};

export default tripReducer;