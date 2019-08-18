import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import TripDetail from "../TripDetail"
import TripCoverPhoto from "../TripCoverPhoto"
import Loader from "../../Shared/Loader"
import Attendees from "./Attendees";
import Conversation from "./Conversation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleLoading } from "../../../helpers/handlers"

class TripShow extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this.handleLoading = handleLoading.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.handleLoading(() => this.props.getTripById(this.props.match.params.id))
    }
  }

  componentDidMount() {
    this.props.getTripById(this.props.match.params.id)
      .then(() => this.setState({loading: false}))
  }

  render() {
    if (this.state.loading === true || Object.keys(this.props.trip) == 0) return <Loader />
    const { trip } = this.props
    const attendRequestCount = this.props.attendRequests.length

    return (
      <div className="tripShow">

        <section className="tripShow-detail">
          <TripCoverPhoto coverPhoto={trip.coverPhoto} title={trip.title} />
          <TripDetail trip={trip} />
        </section>

        <section className="tripShow-body">
          <ul className="tripShow-body-nav">
            <li className="tripShow-body-nav-link">
              <NavLink to={ `/trips/${trip.id}/conversation`}>
                <FontAwesomeIcon icon="comments" />
                Coversation
              </NavLink>
            </li>
            {/*<li className="tripShow-body-nav-link"><a href="#">Inventory</a></li>*/}
            <li className="tripShow-body-nav-link">
              <NavLink to={`/trips/${trip.id}/attendance`}>
                <FontAwesomeIcon icon="hiking" />
                Attendees
                { attendRequestCount == 0 ?
                  null
                  :
                  <span className="tripShow-notification">
                    { attendRequestCount }
                  </span>
                }
              </NavLink>
            </li>
            {/*<li className="tripShow-body-nav-link"><a href="#">Invites</a></li>*/}
            {/*<li className="tripShow-body-nav-link"><a href="#">Itenerary</a></li>*/}
          </ul>

          <div className="tripShow-body-content">
            <Switch>
              <Route
                path="/trips/:tripId/attendance"
                render={() => <Attendees attendRequests={ this.props.attendRequests } isLeader={this.props.isLeader} tripId={ trip.id } /> }
              />
              <Route
                path="/trips/:tripId/conversation"
                component={ Conversation }
              />
            </Switch>
          </div>
        </section>
      </div>
    )
  }
}

export default TripShow