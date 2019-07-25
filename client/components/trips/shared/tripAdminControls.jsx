import React from 'react'
import { Link } from 'react-router-dom'

const TripAdminControls = ({deleteTrip, isAdmin, tripId}) => {
  if (!isAdmin) return null
  return (
    <div className="trip-controls-admin">
      <Link to={`/trips/${tripId}/edit`} className="trip-button-edit">Edit</Link>
      <button
        onClick={deleteTrip}
        className="trip-button-delete">
        X
      </button>
    </div>
  )
}



export default TripAdminControls