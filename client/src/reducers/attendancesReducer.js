import {
  RECEIVE_ATTENDANCE,
  RECEIVE_ATTENDANCES,
  REMOVE_ATTENDANCE,
  CLEAR_ATTENDANCES
} from "../actions/attendanceActions"

const attendancesReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_ATTENDANCE:
      return Object.assign(newState, action.attendance)
    case RECEIVE_ATTENDANCES:
      return action.attendances
    case REMOVE_ATTENDANCE:
      delete newState[action.id]
      return newState
    case CLEAR_ATTENDANCES:
      return {}
    default:
      return oldState
  }
}

export default attendancesReducer