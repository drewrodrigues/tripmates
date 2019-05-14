import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const tripAttendees = ({ creator }) => {
  return (
    <div className="tripAttendees">
      <img src={ creator.profilePicture } className="tripAttendee" />
    </div>
  )
}

export default tripAttendees