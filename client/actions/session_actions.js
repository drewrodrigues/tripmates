import * as APIUtil from './../utils/session_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const LOGOUT = "LOGOUT";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const receiveLogout = () => ({
  type: LOGOUT
});

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(res => dispatch(receiveLogout()));
};

export const signIn = (user) => dispatch => {
  return APIUtil.login(user)
    .then(res => dispatch(receiveCurrentUser(res)));
};

