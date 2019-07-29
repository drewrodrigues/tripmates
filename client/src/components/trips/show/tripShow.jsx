import React, {Component} from 'react'
import TripAdminControlsContainer from '../shared/tripAdminControlsContainer'

class TripShow extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.deleteTrip = this.deleteTrip.bind(this)
  }

  componentDidMount() {
    this.props.getTripById(this.props.match.params.id)
      .then(() => this.setState({loading: false}))
  }

  deleteTrip() {
    this.props.deleteTrip(this.props.match.params.id).then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    if (this.state.loading === true) return null
    const {trip, leader} = this.props

    return (
      <div className="tripShow">

        <section className="tripShow-detail">
          <h3 className="tripShow-detail-title">{trip.title}</h3>

          <div className="tripShow-detail-photo">
            {trip.coverPhoto ?
            <img src={trip.coverPhoto} alt={`${trip.title} photo`} />
            :
            <></>
            }
            <TripAdminControlsContainer />
          </div>

          <div className="tripShow-detail-body">
            <div className="tripShow-detail-body-header">
              <h5 className="tripShow-detail-location">{trip.location}</h5>
              <h5 className="tripShow-detail-dates">{trip.startDate} - {trip.endDate}</h5>
            </div>

            <div className="tripShow-detail-badges">
              <span className="tripIndexItem-badge tripIndexItem-badge-blue">{trip.daysUntil} days until</span>
              <span className="tripIndexItem-badge tripIndexItem-badge-blue">{trip.duration} days long</span>
              <span className="tripIndexItem-badge tripIndexItem-badge-red">3 spots left</span>
            </div>

            <p className="tripShow-detail-description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here’.</p>

            <p className="tripShow-detail-led-by">
              <img src={leader.profilePicture} />
              Led by <a href="#" className="tripShow-detail-led-by-user">
                {leader.firstName} {leader.lastName}
              </a>
            </p>
          </div>
        </section>

        <section className="tripShow-body">
          <ul className="tripShow-body-nav">
            <li className="tripShow-body-nav-link active"><a href="#">Posts</a></li>
            <li className="tripShow-body-nav-link"><a href="#">Inventory</a></li>
            <li className="tripShow-body-nav-link"><a href="#">Attendees</a></li>
            <li className="tripShow-body-nav-link"><a href="#">Invites</a></li>
            <li className="tripShow-body-nav-link"><a href="#">Itenerary</a></li>
          </ul>

          <div className="tripShow-body-content">
            <p>Something goes here</p>
          </div>
        </section>
      </div>
    )
  }
}

export default TripShow