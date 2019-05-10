import React from 'react'
import { Link } from 'react-router-dom'

const TripAdminControls = ({ deleteTrip, isAdmin, tripId }) => {
  if (!isAdmin) return null
  return (
    <>
      <Link to={ `/trips/${tripId}/edit` }>Edit</Link>
      <button
        onClick={ deleteTrip }
        className="btn btn-sm btn-light float-right">
        X
      </button>
    </>
  )
}



export default TripAdminControls