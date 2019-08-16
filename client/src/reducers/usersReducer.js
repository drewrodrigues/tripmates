import { RECEIVE_USER, RECEIVE_USERS } from "../actions/userActions"

const usersReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign(newState, action.user)
    case RECEIVE_USERS:
      return Object.assign(newState, action.users)
    default:
      return oldState
  }
}

export default usersReducer
