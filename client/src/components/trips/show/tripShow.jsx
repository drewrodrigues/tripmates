import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {prettyDaysUntil, prettyDuration } from '../../../helpers/formatters'
import TripDetail from "../TripDetail"
import TripCoverPhoto from "../TripCoverPhoto"

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
          <TripCoverPhoto coverPhoto={trip.coverPhoto} title={trip.title} />
          <TripDetail trip={trip} />
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