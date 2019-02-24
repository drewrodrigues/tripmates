import * as APIUtil from '../utils/sessionUtil'

import { receiveUser } from './userActions'

export const RECEIVE_CURRENT_USER   = "RECEIVE_CURRENT_USER"
export const LOGOUT                 = "LOGOUT"

export const receiveCurrentUser = user => {
  return {type: RECEIVE_CURRENT_USER, user}
}

export const receiveLogout = () => {
  return {type: LOGOUT}
}

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(res => dispatch(receiveLogout()))
}

export const signIn = (user) => dispatch => {
  return APIUtil.login(user)
    .then(res => {
      dispatch(receiveCurrentUser(res))
      dispatch(receiveUser(res))
    })
}