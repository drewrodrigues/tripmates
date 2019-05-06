import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {prettyDate} from '../../../helpers/formatters'

const TripDateRange = ({startDate, endDate}) => {
  return (
    <div className="tripDateRange">
      <FontAwesomeIcon icon="calendar-alt" />
      <span>{prettyDate(startDate)} </span>
      <FontAwesomeIcon icon="long-arrow-alt-right" />
      <span>{prettyDate(endDate)}</span>
    </div>
  )
}

export default TripDateRange