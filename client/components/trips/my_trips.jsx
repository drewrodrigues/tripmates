import React from 'react'
import TripForm from './trip_form'
import { Link } from 'react-router-dom'
import MyTripsItem from './my_trips_item';

class MyTrips extends React.Component {
  constructor(props) {
    super(props)

    this.state = {showForm: false}
    this.toggleForm = this.toggleForm.bind(this)
  }
  
  componentDidMount() {
    this.props.retrieveMyTrips(this.props.currentUserID)
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    const {trips, createTrip} = this.props
    const { deleteTrip } = this

    return(
      <div>
        <button onClick={this.toggleForm} className="btn btn-sm btn-success">Add a trip</button>
        {this.state.showForm === true ? (
          <TripForm currentUserID={this.props.currentUserID} createTrip={createTrip}/>
        ) : null}

        <div class="card-columns">
          {trips.map(trip => (
            <MyTripsItem trip={trip}/>
          ))}
        </div>
      </div>
    )
  }
}

export default MyTrips