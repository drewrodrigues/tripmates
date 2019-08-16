import * as MessageUtils from "../utils/messageUtils"
import { receiveUsers } from "./userActions"

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"
export const REMOVE_MESSAGE = "REMOVE_MESSAGE"
export const CLEAR_MESSAGES = "CLEAR_MESSAGES"

const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
})

const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
})

const removeMessage = id => ({
  type: REMOVE_MESSAGE,
  id
})

const clearMessages = () => ({
  type: CLEAR_MESSAGES
})

export const createMessage = (tripId, message) => dispatch => {
  return MessageUtils.createMessage(tripId, message)
    .then(res => dispatch(receiveMessage(res.data)))
    .catch(err => console.log(err.response.data))
}

export const getMessages = tripId => dispatch => {
  return MessageUtils.getMessages(tripId)
    .then(res => {
      dispatch(receiveMessages(res.data.messages))
      dispatch(receiveUsers(res.data.users))
    })
    .catch(err => console.log(err.response.data))
}

export const deleteMessage = id => dispatch => {
  return MessageUtils.deleteMessage(id)
    .then(res => dispatch(removeMessage(id)))
    .catch(err => console.log(err.response.data))
}