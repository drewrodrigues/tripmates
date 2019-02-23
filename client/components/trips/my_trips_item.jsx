import React from 'react'
import { Link } from 'react-router-dom'

const MyTripsItem = (props) => {
  if (props.trip === undefined || props.trip.creator === undefined) {
    console.log(props)
    return null
  }

  return (
    <div className="card" key={props.trip.id}>
      <img src={props.trip.image_url} class="card-img-top" alt="" />
      <div className="card-body">
        <Link to={`/trips/${props.trip.id}`}>
          <h5 className="card-title">{props.trip.title}</h5>
        </Link>
        <p className="card-text">{props.trip.location}</p>
        <p class="light">{props.trip.creator.first_name}</p>
      </div>
    </div>
  )
}

export default MyTripsItem