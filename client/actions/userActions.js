import * as APIUtil from "../utils/sessionUtil"; // TODO: pull into user util
import { receiveCurrentUser } from './sessionActions';

export const RECEIVE_USER  = "RECEIVE_USER"
export const RECEIVE_USERS = "RECEIVE_USERS"

export const receiveUser = user => {
  return {type: RECEIVE_USERS, user}
}

export const receiveUsers = users => {
  return {type: RECEIVE_USERS, users}
}

export const signUp = user => dispatch => {
  return APIUtil.signUp(user)
    .then(res => dispatch(receiveCurrentUser(res)));
};