import { RECEIVE_CURRENT_USER, LOGOUT } from "../actions/sessionActions"

const _nullUser = { id: null }

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const id = parseInt(Object.keys(action.user)[0])
      return { id: id }
    case LOGOUT:
      return _nullUser
    default:
      return state
  }
}

export default sessionReducer
