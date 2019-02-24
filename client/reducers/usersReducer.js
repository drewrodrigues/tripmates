import { RECEIVE_USER, RECEIVE_USERS } from '../actions/userActions'

const usersReducer = (state = {}, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, action.user)
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users)
    default:
      return state
  }
}

export default usersReducer