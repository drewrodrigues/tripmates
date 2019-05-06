import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const TripLocation = ({location}) => {
  return (
    <div className="tripLocation">
      <FontAwesomeIcon icon="map-marker-alt"/>
      {location}
    </div>
  )
}

export default TripLocation