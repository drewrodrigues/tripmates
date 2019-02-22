import * as APIUtil from './../utils/session_util';

export const RECEIVE_CURRENT_USER   = "RECEIVE_CURRENT_USER";
export const LOGOUT                 = "LOGOUT";

const receiveCurrentUser = user => {
  return {type: RECEIVE_CURRENT_USER, user}
};

const receiveLogout = () => {
  return {type: LOGOUT}
};

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(res => dispatch(receiveLogout()));
};

export const signIn = (user) => dispatch => {
  return APIUtil.login(user)
    .then(res => dispatch(receiveCurrentUser(res)));
};

