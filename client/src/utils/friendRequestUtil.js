import $ from 'jquery'

export const getAllFriendRequests = () => {
  return $.ajax({
    url: "/api/friend_requests"
  })
}

export const deleteFriendRequest = id => {
  return $.ajax({
    url: `/api/friend_requests/${id}`,
    type: "DELETE"
  })
}

export const createFriendRequest = id => {
  return $.ajax({
    url: '/api/friend_requests',
    type: "POST",
    data: { id }
  })
}