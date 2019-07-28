import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {prettyDaysUntil} from '../../../helpers/formatters'

const TripDaysUntil = ({daysUntil}) => {
  return (
    <div className="tripDaysUntil">
      <FontAwesomeIcon icon="hourglass-half" />
      {prettyDaysUntil(daysUntil)}
    </div>
  )
}

export default TripDaysUntil