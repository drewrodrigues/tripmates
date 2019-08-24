import React from 'react'

const ItineraryItemPhoto = ({ photo, title }) => {
  if (!photo) return null

  return (
    <div className="ItineraryItemPhoto-container" style={{ backgroundImage: `url(${photo})` }}>
      <h2>{title}</h2>
    </div>
  )
}

export default ItineraryItemPhoto