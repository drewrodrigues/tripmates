import * as SessionUtil from "../utils/sessionUtil" // TODO: pull into user util
import * as UserUtil from "../utils/userUtil"
import { receiveCurrentUser } from "./sessionActions"

export const RECEIVE_USER = "RECEIVE_USER"
export const RECEIVE_USERS = "RECEIVE_USERS"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS"
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS"

export const receiveUser = user => {
  return { type: RECEIVE_USER, user }
}

export const receiveUsers = users => {
  return { type: RECEIVE_USERS, users }
}

export const receiveUserErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

export const clearUserErrors = () => {
  return { type: CLEAR_USER_ERRORS }
}

export const signUp = user => dispatch => {
  return SessionUtil.signUp(user)
    .then(res => {
      dispatch(receiveCurrentUser(res.data))
      dispatch(receiveUser(res.data))
      return res.data
    })
    .catch(error => {
      dispatch(receiveUserErrors(error.response.data))
      return Promise.reject(error.response.data)
    })
}

export const getAllUsers = () => dispatch => {
  return UserUtil.getAllUsers().then(res => {
    dispatch(receiveUsers(res.data))
  })
}
