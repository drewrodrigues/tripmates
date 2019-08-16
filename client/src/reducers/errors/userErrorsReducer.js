import {
  RECEIVE_USER_ERRORS,
  CLEAR_USER_ERRORS
} from "../../actions/userActions"

const userErrorsReducer = (oldState = [], action) => {
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors
    case CLEAR_USER_ERRORS:
      return []
    default:
      return oldState
  }
}

export default userErrorsReducer
