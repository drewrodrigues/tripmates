import * as APIUtil from "../utils/session_util"; // TODO: pull into user util
import { receiveCurrentUser } from './session_actions';

export const signUp = user => dispatch => {
  return APIUtil.signUp(user)
    .then(res => dispatch(receiveCurrentUser(res)));
};