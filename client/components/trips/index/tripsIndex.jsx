import React from 'react'
import TripForm from '../tripForm'
import { Link } from 'react-router-dom'
import MyTripsItem from './tripsIndexItem'

class MyTrips extends React.Component {
  constructor(props) {
    super(props)

    this.state = {showForm: false, isLoading: true}
    this.toggleForm = this.toggleForm.bind(this)
  }
  
  componentDidMount() {
    const that = this
    this.props.retrieveMyTrips(this.props.currentUserID)
      .then(() => that.setState({isLoading: false}))
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    }
    const {trips, createTrip} = this.props
    const { deleteTrip } = this

    return(
      <div>
        <button onClick={this.toggleForm} className="btn btn-sm btn-success">Add a trip</button>
        {this.state.showForm === true ? (
          <TripForm currentUserID={this.props.currentUserID} createTrip={createTrip}/>
        ) : null}

        <div className="card-columns">
          {trips.map(trip => (
            <MyTripsItem trip={trip} key={trip.id}/>
          ))}
        </div>
      </div>
    )
  }
}

export default MyTrips