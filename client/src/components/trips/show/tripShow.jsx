import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import TripDetail from "../TripDetail"
import TripCoverPhoto from "../TripCoverPhoto"
import Loader from "../../Shared/Loader"
import Attendees from "./Attendees";

class TripShow extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({ loading: true }, () => {
        this.props.getTripById(this.props.match.params.id)
          .then(() => this.setState({ loading: false }))
      })
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
            {/*<li className="tripShow-body-nav-link active"><a href="#">Coversation</a></li>*/}
            {/*<li className="tripShow-body-nav-link"><a href="#">Inventory</a></li>*/}
            <li className="tripShow-body-nav-link">
              <NavLink to={`/trips/${trip.id}`}>
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
                path="/trips/:id"
                render={() => <Attendees attendRequests={ this.props.attendRequests } isLeader={this.props.isLeader} tripId={ trip.id } /> }
              />
            </Switch>
          </div>
        </section>
      </div>
    )
  }
}

export default TripShow