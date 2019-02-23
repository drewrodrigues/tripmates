import React from 'react'
import { Link } from 'react-router-dom'

const MyTripsItem = (props) => {
  if (props.trip === undefined || props.trip.creator === undefined) {
    return null
  }
  

  return (
    <div className="card" key={props.trip.id}>
      <div className="card-body">
        <img src={props.trip.imageUrl} className="card-thumb" alt="" />

        <div class="card-content">
          <p className="card-date">From <span>{props.trip.startDate}</span> to <span>{props.trip.endDate}</span></p>
          <Link to={`/trips/${props.trip.id}`}>
            <h5 className="card-title">{props.trip.title}</h5>
          </Link>

          <p className="card-location">{props.trip.location}</p>

          <p className="light">Created by <span className="badge badge-primary">{props.trip.creator.fullName}</span></p>
        </div>
      </div>
    </div>
  )
}

export default MyTripsItem