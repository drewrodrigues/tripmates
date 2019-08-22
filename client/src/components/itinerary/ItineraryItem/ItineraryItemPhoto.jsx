import React from 'react'

const ItineraryItemPhoto = ({ photo }) => {
  if (!photo) return null

  return (
    <div className="ItineraryItemPhoto-container" style={{ backgroundImage: `url(${photo})` }}>
      <h2>Something</h2>
    </div>
  )
}

export default ItineraryItemPhoto