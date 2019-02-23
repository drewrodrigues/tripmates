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
      console.log('delete trip')
      this.props.deleteTrip(trip).then(() => {
        console.log('trip delete')
        that.props.history.push('/created_trips')
      })
    }
  }
  
  render() {
    const trip = this.props.trip
    if (this.props.trip === undefined || this.props.trip.creator === undefined) return null;
    
    const { startDate, endDate, imageUrl, title, creator } = trip
    const { deleteTrip } = this

    return (
      <>
        <div className="jumbotron" style={{backgroundImage: `url(${imageUrl})`}}>
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