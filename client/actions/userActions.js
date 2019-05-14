import * as SessionUtil from "../utils/sessionUtil" // TODO: pull into user util
import * as UserUtil from '../utils/userUtil'
import { receiveCurrentUser } from './sessionActions'

export const RECEIVE_USER  = "RECEIVE_USER"
export const RECEIVE_USERS = "RECEIVE_USERS"

export const receiveUser = user => {
  return {type: RECEIVE_USER, user}
}

export const receiveUsers = users => {
  return {type: RECEIVE_USERS, users}
}

export const signUp = user => dispatch => {
  return SessionUtil.signUp(user)
  .then(res => {
      dispatch(receiveCurrentUser(res))
      dispatch(receiveUser(res))
    })
}

export const getAllUsers = () => dispatch => {
  return UserUtil.getAllUsers()
    .then(res => {
      dispatch(receiveUsers(res))
    })
}