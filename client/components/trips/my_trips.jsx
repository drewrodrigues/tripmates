import React from 'react'
import TripForm from './trip_form'
import { Link } from 'react-router-dom'

class MyTrips extends React.Component {
  componentDidMount() {
    this.props.retrieveMyTrips(this.props.currentUserID)
  }

  render() {
    const {trips, createTrip} = this.props
    const { deleteTrip } = this

    return(
      <div>
        <div class="jumbotron">
          <h3>My Trips</h3>
        </div>
        <TripForm currentUserID={this.props.currentUserID} createTrip={createTrip}/>

        <div class="card-columns">
          {trips.map(trip => (
            <div className="card" key={trip.id}>
              <img src={trip.image_url} class="card-img-top" alt="" />
              <div className="card-body">
                <Link to={`/trips/${trip.id}`}>
                  <h5 className="card-title">{trip.title}</h5>
                </Link>
                <p className="card-text">{trip.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MyTrips