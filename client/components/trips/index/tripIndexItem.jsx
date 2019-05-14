import React from 'react'
import { Link } from 'react-router-dom'
import TripDaysUntil from '../shared/tripDaysUntil'
import TripLeader from '../shared/tripLeader'
import TripLocation from '../shared/tripLocation'
import TripDateRange from '../shared/tripDateRange'
import TripDuration from '../shared/tripDuration'
import TripAttendees from '../shared/tripAttendees'

const TripIndexItem = (props) => {
  const {
    id,
    daysUntil,
    duration,
    title,
    coverPhoto,
    location,
    creator,
    startDate,
    endDate
  } = props.trip

  return (
    <Link
      to={ `/trips/${id}` }
      className="card tripIndexItem"
      style={{ "backgroundImage": `url(${ coverPhoto })` }}
    >

      <header className="tripIndexItem-header">
        <TripDateRange
          startDate={ startDate }
          endDate={ endDate } />
      </header>

      <h3  className="tripIndexItem-title">{ title }</h3>

      <div className="tripIndexItem-relativeDates">
        <TripDaysUntil daysUntil={ daysUntil } />
        <TripDuration duration={ duration } />
      </div>

      <footer className="tripIndexItem-footer">
        <TripLocation location={ location } className="tripIndexItem-location"/>
        <TripAttendees creator={ creator } />
      </footer>
    </Link>
  )
}

export default TripIndexItem