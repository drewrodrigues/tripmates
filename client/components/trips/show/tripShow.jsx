import React from 'react'
import TripDaysUntil from '../shared/tripDaysUntil'
import TripAttendees from '../shared/tripAttendees'
import TripLocation from '../shared/tripLocation'
import TripDateRange from '../shared/tripDateRange'
import TripDuration from '../shared/tripDuration'
import TripAdminControlsContainer from '../shared/tripAdminControlsContainer'

class TripShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
    this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentDidMount() {
    this.props.getTripById(this.props.match.params.id)
      .then(() => this.setState({ isLoading: false }))
  }

  deleteTrip() {
    this.props.deleteTrip(this.props.match.params.id).then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    if (this.state.isLoading === true) return null
    const { trip, leader } = this.props
    console.log(leader)

    return (
      <div className="jumbotron tripShow" style={{ backgroundImage: `url(${ trip.coverPhoto })` }}>

        <TripAdminControlsContainer />

        <h2 className="tripShow-title">{ trip.title }</h2>
        <TripLocation location={ trip.location } />
        <TripDateRange startDate={ trip.startDate} endDate={ trip.endDate } />
        <TripDaysUntil daysUntil={ trip.daysUntil } />
        <TripDuration duration={ trip.duration } />
        <TripAttendees creator={ leader } />
      </div>
    )
  }
}

export default TripShow;