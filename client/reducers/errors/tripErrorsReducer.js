import {
  RECEIVE_TRIP_ERRORS,
  CLEAR_TRIP_ERRORS
} from '../../actions/tripActions'

const tripErrorsReducer = (oldState = [], action) => {
  switch (action.type) {
    case RECEIVE_TRIP_ERRORS:
      return action.errors
    case CLEAR_TRIP_ERRORS:
      return []
    default:
      return oldState
  }
}

export default tripErrorsReducer