import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {prettyDaysUntil, prettyDuration } from '../../../helpers/formatters'

class TripShow extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.getTripById(this.props.match.params.id)
      .then(() => this.setState({loading: false}))
  }

  render() {
    if (this.state.loading === true) return null
    const {trip, leader, isLeader} = this.props

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
          </div>

          <div className="tripShow-detail-body">
            <div className="tripShow-detail-body-header">
              <h5 className="tripShow-detail-location">{trip.location}</h5>
              <h5 className="tripShow-detail-dates">{trip.startDate} - {trip.endDate}</h5>
            </div>

            <div className="tripShow-detail-badges">
              <span className="tripIndexItem-badge tripIndexItem-badge-blue">{prettyDaysUntil(trip.startDate)}</span>
              <span className="tripIndexItem-badge tripIndexItem-badge-blue">{prettyDuration(trip.duration)}</span>
              <span className="tripIndexItem-badge tripIndexItem-badge-red">3 spots left</span>
            </div>

            <p className="tripShow-detail-description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here’.</p>

            {isLeader ?
              <>
                <Link to={`/trips/${trip.id}/edit`} className="tripIndexItem-button-edit">Edit</Link>
                <span className="tripIndexItem-led-by">Led by you</span>
              </>
            :
              <>
                <img
                  src={ leader.profilePicture }
                  className="tripIndexItem-leader-avatar"
                />
                <span className="tripIndexItem-led-by">
                  Led by
                  <a className="tripIndexItem-led-by-user"> {leader.firstName} {leader.lastName}</a>
                </span>
              </>
            }
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