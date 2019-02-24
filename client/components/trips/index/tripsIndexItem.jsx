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
        <p className="badge badge-light card-duration ">{props.trip.duration} long</p>

        <div className="card-content clear">
          <p className="card-date">From <span>{props.trip.startDate}</span> to <span>{props.trip.endDate}</span></p>
          <Link to={`/trips/${props.trip.id}`}>
            <h5 className="card-title">{props.trip.title}</h5>
          </Link>

          <p className="card-location">{props.trip.location}</p>

          <p className="card-description">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,  Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

        </div>

        <div className="footer">
          <p className="card-creator">Created by <a className="badge badge-primary">{props.trip.creator.fullName}</a></p>
          <p className="card-days-until badge badge-warning">{props.trip.daysUntil}</p>
        </div>
      </div>
    </div>
  )
}

export default MyTripsItem