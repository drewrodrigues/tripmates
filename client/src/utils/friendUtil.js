import axios from "axios"

// friend: id of friendRequest
export const addFriend = friendRequestId => {
  return axios({
    method: "post",
    url: "/api/friends",
    data: { id: friendRequestId }
  })
}

export const getFriends = () => {
  return axios({
    method: "get",
    url: "/api/friends"
  })
}

// id: of friendRecord
export const deleteFriend = id => {
  return axios({
    method: "delete",
    url: `/api/friends/${id}`
  })
}
