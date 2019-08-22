import React from 'react'

const ItineraryItemPhoto = ({ photo }) => {
  if (!photo) return null

  return (
    <div className="ItineraryItemPhoto-container" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1489275449173-7c7fe1d26f54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)" }}>
      <h2>Something</h2>
    </div>
  )
}

export default ItineraryItemPhoto