
import axios from 'axios'

export const getAllFriendRequests = () => {
  return axios({
    url: "/api/friend_requests"
  })
}

export const deleteFriendRequest = id => {
  return axios({
    url: `/api/friend_requests/${id}`,
    method: "DELETE"
  })
}

export const createFriendRequest = id => {
  return axios({
    url: '/api/friend_requests',
    method: "POST",
    data: { id }
  })
}