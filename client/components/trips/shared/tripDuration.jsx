import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {prettyDuration} from '../../../helpers/formatters'

const TripDuration = ({duration}) => {
  return (
    <div className="tripDuration">
      <FontAwesomeIcon icon="clock"/>
      {prettyDuration(duration)}
    </div>
  )
}

export default TripDuration