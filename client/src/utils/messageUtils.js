import axios from "axios"

export const createMessage = (tripId, message) => {
  return axios({
    method: "post",
    url: `/api/trips/${tripId}/messages`,
    data: message // { message: { body: "" }
  })
}

export const getMessages = tripId => {
  return axios({
    method: "get",
    url: `/api/trips/${tripId}/messages`
  })
}

export const deleteMessage = id => {
  return axios({
    method: "delete",
    url: `/api/messages/${id}`
  })
}