import React from 'react'

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

  deleteTrip(trip) {
    const that = this

    return (e) => {
      e.stopPropagation()
      this.setState({isLoading: true})
      this.props.deleteTrip(trip).then(() => {
        that.props.history.push('/created_trips')
      })
    }
  }
  
  render() {
    if (this.state.isLoading === true) return null

    const trip = this.props.trip
    const { startDate, endDate, coverPhoto, title, creator } = trip
    const { deleteTrip } = this

    return (
      <>
        <div className="jumbotron trip-show" style={{ backgroundImage: `url(${coverPhoto})` }}>
          <button 
            onClick={deleteTrip(trip)}
            className="btn btn-sm btn-light float-right">
            X
          </button>

          <h2>{title}</h2>
          <p>From {startDate} to {endDate}</p>
          Created by <span className="badge badge-primary">{creator.fullName}</span>
        </div>

        <div>

        </div>
      </>
    )
  }
}

export default TripShow;