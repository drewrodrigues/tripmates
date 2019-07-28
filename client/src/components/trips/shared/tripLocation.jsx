import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const TripLocation = ({location}) => {
  return (
    <p className="tripLocation">
      <FontAwesomeIcon icon="map-marker-alt"/>
      {location}
    </p>
  )
}

export default TripLocation