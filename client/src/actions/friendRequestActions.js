import * as APIUtil from '../utils/friendRequestUtil'

export const RECEIVE_FRIEND_REQUEST  = "RECEIVE_FRIEND_REQUEST"
export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS"
export const REMOVE_FRIEND_REQUEST   = "REMOVE_FRIEND_REQUEST"

export const receiveFriendRequest = friendRequest => {
  return {type: RECEIVE_FRIEND_REQUEST, friendRequest}
}

export const receiveFriendRequests = friendRequests => {
  return {type: RECEIVE_FRIEND_REQUESTS, friendRequests}
}

export const removeFriendRequest = id => {
  return {type: REMOVE_FRIEND_REQUEST, id}
}

export const getAllFriendRequests = () => dispatch => {
  return APIUtil.getAllFriendRequests()
    .then(response => {
      dispatch(receiveFriendRequests(response.data))
    })
}

export const deleteFriendRequest = id => dispatch => {
  return APIUtil.deleteFriendRequest(id)
    .then(() => {
      dispatch(removeFriendRequest(id))
    })
}

export const createFriendRequest = id => dispatch => {
  return APIUtil.createFriendRequest(id)
    .then(response => {
      dispatch(receiveFriendRequest(response.data))
    })
}