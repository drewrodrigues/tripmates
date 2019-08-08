import * as FriendUtil from "../utils/friendUtil"
import {
  receiveUser,
  receiveUsers
} from "./userActions"
import {
  removeFriendRequest
} from "./friendRequestActions"

export const RECEIVE_FRIEND = "RECEIVE_FRIEND"
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS"
export const REMOVE_FRIEND = "REMOVE_FRIEND"

export const receiveFriend = friend => {
  return {
    type: RECEIVE_FRIEND,
    friend
  }
}

export const receiveFriends = friends => {
  return {
    type: RECEIVE_FRIENDS,
    friends
  }
}

export const removeFriend = id => {
  return {
    type: REMOVE_FRIEND,
    id
  }
}

export const addFriend = friendRequestId => dispatch => {
  return FriendUtil.addFriend(friendRequestId)
    .then(res => {
      dispatch(receiveFriend(res.data.friend))
      dispatch(receiveUser(res.data.user))
      dispatch(removeFriendRequest(friendRequestId))
    })
    .catch(err => console.log(err.response.data))
}

export const getFriends = () => dispatch => {
  return FriendUtil.getFriends()
    .then(res => {
      dispatch(receiveFriends(res.data.friends))
      dispatch(receiveUsers(res.data.users))
    })
}

export const deleteFriend = id => dispatch => {
  return FriendUtil.deleteFriend(id)
    .then(() => dispatch(removeFriend(id)))
    .catch(err => console.log(err.response.data))
    // TODO: add notification box
}

window.addFriend = addFriend
window.getFriends = getFriends
window.deleteFriend = deleteFriend