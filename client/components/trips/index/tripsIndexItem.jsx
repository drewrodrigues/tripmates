import React from 'react'
import { Link } from 'react-router-dom'

const MyTripsItem = (props) => {
  if (props.trip === undefined || props.trip.creator === undefined) {
    return null
  }
  

  return (
    <div className="card" key={props.trip.id}>
      <img src={props.trip.imageUrl} class="card-img-top" alt="" />
      <div className="card-body">
        <Link to={`/trips/${props.trip.id}`}>
          <h5 className="card-title">{props.trip.title}</h5>
        </Link>
        <p className="card-text">{props.trip.location}</p>
        <p class="light">Created by <span class="badge badge-primary">{props.trip.creator.fullName}</span></p>
      </div>
    </div>
  )
}

export default MyTripsItem