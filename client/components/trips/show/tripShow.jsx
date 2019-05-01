import React from 'react'

import { prettyDate, prettyDaysUntil, prettyDuration } from '../../../helpers/formatters'

class TripShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isLoading: true}

    this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentDidMount() {
    const that = this
    this.props.getTripById(this.props.match.params.id)
      .then(() => that.setState({isLoading: false}))
  }

  deleteTrip() {
    const that = this
    this.setState({isLoading: true})
    console.log(this.props)
    this.props.deleteTrip(this.props.match.params.id).then(() => {
      console.log('delete trip')
      that.props.history.push('/created_trips')
    })
  }
  
  render() {
    if (this.state.isLoading === true) return null

    const { trip } = this.props

    return (
      <>
        <div className="jumbotron trip-show" style={{ backgroundImage: `url(${trip.coverPhoto})` }}>
          <button 
            onClick={ deleteTrip }
            className="btn btn-sm btn-light float-right">
            X
          </button>

          <h2>{trip.title}</h2>
          <p>{trip.location}</p>
          <p>From {prettyDate(trip.startDate)} to {prettyDate(trip.endDate)}</p>
          <p>{prettyDaysUntil(trip.daysUntil)}</p>
          <p>{prettyDuration(trip.duration)}</p>
          Created by <span className="badge badge-primary">{trip.creator.fullName}</span>
        </div>

        <div>

        </div>
      </>
    )
  }
}

export default TripShow;