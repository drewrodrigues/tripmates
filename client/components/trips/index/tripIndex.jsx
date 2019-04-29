import React from 'react'
import { Link } from 'react-router-dom'

import TripIndexItemContainer from './tripIndexItemContainer'

class TripIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showForm: false, isLoading: true }
    this.toggleForm = this.toggleForm.bind(this)
  }
  
  componentDidMount() {
    const that = this
    this.props.retrieveMyTrips(this.props.currentUserID)
      .then(() => that.setState({ isLoading: false }))
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      )
    }
    const { trips } = this.props

    return(
      <div>
        <div className="tripsIndex">
          <Link to="/new-trip" className="btn btn-success btn-sm">New Trip</Link>
          {trips.map(trip => (
            <TripIndexItemContainer 
              trip={trip} 
              key={trip.id}/>
          ))}
        </div>
      </div>
    )
  }
}

export default TripIndex