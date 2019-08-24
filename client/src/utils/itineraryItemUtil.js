import axios from 'axios'

export const createItineraryItem = (tripId, item) => {
  return axios({
    method: "post",
    url: `/api/trips/${tripId}/itinerary_items`,
    data: item
  })
}

export const getItineraryItems = tripId => {
  return axios({
    method: "get",
    url: `/api/trips/${tripId}/itinerary_items`
  })
}

export const deleteItineraryItem = (tripId, id) => {
  return axios({
    method: "delete",
    url: `/api/trips/${tripId}/itinerary_items/${id}`
  })
}