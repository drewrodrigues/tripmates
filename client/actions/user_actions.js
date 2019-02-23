import * as APIUtil from "../utils/session_util"; // TODO: pull into user util
import { receiveCurrentUser } from './session_actions';

export const RECEIVE_USERS = "RECEIVE_USERS"

export const receiveUsers = users => {
  return {type: RECEIVE_USERS, users}
}

export const signUp = user => dispatch => {
  return APIUtil.signUp(user)
    .then(res => dispatch(receiveCurrentUser(res)));
};