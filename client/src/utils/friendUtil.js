import axios from "axios"

// friend: user
export const addFriend = friend => {
  return axios({
    method: "post",
    url: "/api/friends",
    data: { id: friend.id }
  })
}

export const getFriends = () => {
  return axios({
    method: "get",
    url: "/api/friends"
  })
}

// id: of friend record
export const deleteFriend = id => {
  return axios({
    method: "delete",
    url: `/api/friends/${id}`
  })
}