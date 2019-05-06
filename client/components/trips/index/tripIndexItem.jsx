import React from 'react'
import { Link } from 'react-router-dom'
import TripDaysUntil from '../shared/tripDaysUntil'
import TripLeader from '../shared/tripLeader'
import TripLocation from '../shared/tripLocation'
import TripDateRange from '../shared/tripDateRange'
import TripDuration from '../shared/tripDuration'

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
    <div className="card tripIndexItem" key={id} style={{"backgroundImage": `url(${coverPhoto})`}}>
      <div className="card-body">
        <div className="card-content clear">
          <Link to={`/trips/${id}`}>
            <h5 className="card-title tripIndexItem-title">{title}</h5>
          </Link>
        </div>
      </div>

      <div className="tripIndexItem-relativeDates">
        <TripDaysUntil daysUntil={daysUntil}/>
        <TripDuration duration={duration}/>
      </div>

      <TripLocation location={location} className="tripIndexItem-location"/>
      <TripLeader leader={creator}/>
      <TripDateRange
        startDate={startDate}
        endDate={endDate}/>
    </div>
  )
}

export default TripIndexItem