import * as APIUtil from '../utils/sessionUtil'

import { receiveUser } from './userActions'

export const RECEIVE_CURRENT_USER   = "RECEIVE_CURRENT_USER"
export const LOGOUT                 = "LOGOUT"
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
export const CLEAR_SESSION_ERRORS   = "CLEAR_SESSION_ERRORS"

export const receiveCurrentUser = user => {
  return { type: RECEIVE_CURRENT_USER, user }
}

const receiveLogout = () => {
  return { type: LOGOUT }
}

const receiveSessionErrors = errors => {
  return { type: RECEIVE_SESSION_ERRORS, errors }
}

export const clearSessionErrors = () => {
  return { type: CLEAR_SESSION_ERRORS }
}

export const logout = () => dispatch => {
  return APIUtil.logout()
    .then(res => {
      dispatch(receiveLogout())
      localStorage.removeItem('session')
    })
}

export const signIn = user => dispatch => {
  return APIUtil.login(user)
    .then(res => {
      dispatch(receiveCurrentUser(res.data))
      dispatch(receiveUser(res.data))
      localStorage.setItem('session', JSON.stringify(res.data))
    })
    .catch(error => {
      dispatch(receiveSessionErrors(error.response.data))
      return Promise.reject(error.response.data)
    })
}