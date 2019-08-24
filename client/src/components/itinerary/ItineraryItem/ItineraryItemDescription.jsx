import React from 'react'

const ItineraryItemDescription = ({ description }) => {
  if (!description) return null

  return (
    <p className="ItineraryItemDescription">{description}</p>
  )
}

export default ItineraryItemDescription