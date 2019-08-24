import * as ItineraryItemUtil from '../utils/itineraryItemUtil'
import { receiveFlash } from "./flashActions";
import { receiveAttendance } from "./attendanceActions";

export const RECEIVE_ITINERARY_ITEM = "RECEIVE_ITINERARY_ITEM"
export const RECEIVE_ITINERARY_ITEMS = "RECEIVE_ITINERARY_ITEMS"
export const REMOVE_ITINERARY_ITEM = "REMOVE_ITINERARY_ITEM"
export const CLEAR_ITINERARY_ITEMS = "CLEAR_ITINERARY_ITEMS"

export const receiveItineraryItem = itineraryItem => ({
  type: RECEIVE_ITINERARY_ITEM,
  itineraryItem
})

export const receiveItineraryItems = itineraryItems => ({
  type: RECEIVE_ITINERARY_ITEMS,
  itineraryItems
})

export const removeItineraryItem = id => ({
  type: REMOVE_ITINERARY_ITEM,
  id
})

export const clearItineraryItems = () => ({
  type: CLEAR_ITINERARY_ITEMS
})

export const createItineraryItem = (tripId, item) => dispatch => {
  return ItineraryItemUtil.createItineraryItem(tripId, item)
    .then(res => dispatch(receiveItineraryItem(res.data.itineraryItem)))
    .catch(err => Promise.reject(err)) // handle at component level
}

export const getItineraryItems = tripId => dispatch => {
  return ItineraryItemUtil.getItineraryItems(tripId)
    .then(res => {
      dispatch(receiveItineraryItems(res.data.itineraryItems))
      dispatch(receiveAttendance(res.data.attendance))
    })
    .catch(err => receiveFlash(err.response.data)) // TODO: review
}

export const deleteItineraryItem = (tripId, id) => dispatch => {
  return ItineraryItemUtil.deleteItineraryItem(tripId, id)
    .then(res => dispatch(removeItineraryItem(id)))
    .catch(err => receiveFlash(err.response.data)) // TODO: review
}