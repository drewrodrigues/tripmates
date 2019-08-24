import {
  RECEIVE_ITINERARY_ITEM,
  RECEIVE_ITINERARY_ITEMS,
  REMOVE_ITINERARY_ITEM,
  CLEAR_ITINERARY_ITEMS
} from '../actions/intineraryItemActions'

const itineraryItemsReducer = (oldState = {}, action) => {
  Object.freeze(oldState)
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_ITINERARY_ITEMS:
      return action.itineraryItems
    case RECEIVE_ITINERARY_ITEM:
      return Object.assign(newState, action.itineraryItem)
    case REMOVE_ITINERARY_ITEM:
      delete newState[action.id]
      return newState
    case CLEAR_ITINERARY_ITEMS:
      return {}
    default:
      return oldState
  }
}

export default itineraryItemsReducer