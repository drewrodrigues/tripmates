import { RECEIVE_CURRENT_USER, LOGOUT } from "../actions/session_actions"; 

const _nullUser = {id: null};

const sessionReducer = (state = _nullUser, action) => {
  console.log(action.type);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const { id } = action.user;
      return Object.assign({}, { id });
    case LOGOUT:
      return _nullUser;
    default:
      return state;
  }
};

export default sessionReducer;