import React from 'react'
import TripDaysUntil from '../shared/tripDaysUntil'
import TripLeader from '../shared/tripLeader'
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
    const that = this
    this.props.getTripById(this.props.match.params.id)
      .then(() => that.setState({ isLoading: false }))
  }

  deleteTrip() {
    const that = this
    this.setState({ isLoading: true })
    console.log(this.props.match.params.id)
    this.props.deleteTrip(this.props.match.params.id).then(() => {
      that.props.history.push('/')
    })
  }

  render() {
    if (this.state.isLoading === true) return null
    const { trip, leader } = this.props

    return (
      <div className="jumbotron trip-show" style={{ backgroundImage: `url(${ trip.coverPhoto })` }}>

        <TripAdminControlsContainer />

        <h2>{ trip.title }</h2>
        <TripLocation location={ trip.location } />
        <TripDateRange startDate={ trip.startDate} endDate={ trip.endDate } />
        <TripDaysUntil daysUntil={ trip.daysUntil } />
        <TripDuration duration={ trip.duration } />
        <TripLeader leader={ leader } />
      </div>
    )
  }
}

export default TripShow;