import React from 'react'

class TripShow extends React.Component {
  constructor(props) {
    super(props)

    this.deleteTrip = this.deleteTrip.bind(this)
  }

  deleteTrip(trip) {
    const that = this

    return (e) => {
      e.stopPropagation()
      console.log(this.props)
      this.props.deleteTrip(trip).then(() => {
        that.props.history.push('/created_trips')
      })
    }
  }
  
  render() {
    const trip = this.props.trip
    if (this.props.trip === undefined) return null;
    
    const { start_date, end_date, image_url, title } = trip
    const { deleteTrip } = this

    return (
      <div>
        <h2>{trip.title}</h2>
        <h2>{trip.start_date}</h2>
        <h2>{trip.end_date}</h2>
        <img src={trip.image_url} />

        <button 
          onClick={deleteTrip(trip)}
          className="btn btn-sm btn-light float-right">
          X
        </button>
      </div>
    )
  }
}

export default TripShow;