import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripDetail from "../TripDetail"
import FriendsPlaceholder from '../../../assets/friends.png'
import WorldPlaceholder from '../../../assets/world.png'
import TripCoverPhoto from '../TripCoverPhoto';
import Loader from "../../Shared/Loader"
import queryString from "query-string"

const TripIndexNoResultsPlaceholder = () => (
  <>
    <header className="tripIndex-noResultsHeader">
      <h3 className="tripIndex-noResults-title">No trips found</h3>
      <h4 className="tripIndex-noResults-subtitle">Try one of the following</h4>
    </header>

    <section className="tripIndex-placeholder-cards">
      <div className="tripIndex-placeholder-card">
        <img src={FriendsPlaceholder} alt="Add a friend" className="tripIndex-placeholder-image" />
        <p className="tripIndex-placeholder-body">By adding friends, you’ll be able to see and request to join their public trips</p>
        <div className="card-buttons">
          <Link to="/friends" className="card-button button button-green button-heavy">
            <FontAwesomeIcon icon="plus"/>
            Add Friends
          </Link>
        </div>
      </div>

      <div className="tripIndex-placeholder-card">
        <img src={WorldPlaceholder} alt="Add a trip" className="tripIndex-placeholder-image" />
        <p className="tripIndex-placeholder-body">Add a trip so your friends can join public trips or you can invite them to private trips</p>
        <div className="card-buttons">
          <Link to="/trips/new" className="button button-green button-heavy">
            <FontAwesomeIcon icon="plus"/>
            Add Trip
          </Link>
        </div>
      </div>
    </section>
  </>
)

const defaultState = {
  loading: false,
  queryWhen: "upcoming",
  queryLedBy: "anyone"
}

class TripIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.updateFilters = this.updateFilters.bind(this)
    this.updateSupdateSearchQuery = this.updateSearchQuery.bind(this)
    this.doneLoading = this.doneLoading.bind(this)
  }

  componentWillUnmount() {
    this.props.clearTrips()
  }

  componentDidMount() {
    this.search()
    this.props.getAttendRequests()
    const query = queryString.parse(this.props.location.search)
    const queryWhen = query.when || this.state.queryWhen
    const queryLedBy = query.ledBy || this.state.queryLedBy
    this.setState({ queryWhen, queryLedBy })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      if (this.props.location.search === "") {
        // coming back to page after mounted
        this.setState(defaultState, this.search)
      } else {
        this.search()
      }
    }
  }

  search() {
    this.props.clearTrips()
    this.setState({ loading: true })
    this.props.searchTrips({
      led_by: this.state.queryLedBy,
      when: this.state.queryWhen,
      date: new Date()
    }).finally(this.doneLoading)
  }

  doneLoading() {
    this.setState({loading: false})
  }

  updateFilters(prop, value) {
    return e => {
      e.preventDefault()
      this.setState({ [prop]: value }, this.updateSearchQuery)
    }
  }

  updateSearchQuery() {
    this.props.history.push({
      pathname: '/trips',
      search: `ledBy=${this.state.queryLedBy}&when=${this.state.queryWhen}`
    })
  }

  render() {
    const {trips} = this.props

    return(
      <div>
        <div className="tripsIndex">
          <header className="tripIndex-header">
            <div className="tripIndex-header-left" onMouseLeave={ () => this.setState({ showLedByFilter: false })}>
              <label className="tripIndex-ledByFilter-label">
                <FontAwesomeIcon icon="user"/>
                Led by
              </label>

              <div className="filter-buttons">
                <button
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryLedBy == 'anyone' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryLedBy', 'anyone')}
                >
                  Anyone
                </button>

                <button
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryLedBy == 'me' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryLedBy', 'me')}
                >
                  Me
                </button>

                <button
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryLedBy == 'friends' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryLedBy', 'friends')}
                >
                  Friends
                </button>
              </div>
            </div>

            <div className="tripIndex-header-center">
              <Link to="/trips/new" className="button button-green button-heavy">
                <FontAwesomeIcon icon="plus"/>
                Add Trip
              </Link>
            </div>

            <div className="tripIndex-header-right">
              <label className="tripIndex-when-label">
                When
                <FontAwesomeIcon icon="calendar-alt"/>
              </label>

              <div className="filter-buttons">
                <button to="/trips/past"
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryWhen == 'past' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryWhen', 'past')}
                >
                  <FontAwesomeIcon icon="history"/>
                  Past
                </button>
                <button to="/trips/all"
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryWhen == 'all' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryWhen', 'all')}
                >
                  All
                </button>
                <button to="/"
                  className={`
                    button button-small button-white filter-button
                    ${this.state.queryWhen == 'upcoming' ? "filter-active" : ""}`
                  }
                  onClick={this.updateFilters('queryWhen', 'upcoming')}
                >
                  <FontAwesomeIcon icon="angle-double-right"/>
                  Upcoming
                </button>
              </div>
            </div>
          </header>

          {this.state.loading && <Loader />}

          {!this.state.loading && trips.length === 0 ?
            <TripIndexNoResultsPlaceholder />
            :
            <div className="tripIndexItems">
              {trips.map(trip => (
                <Link
                  to={`/trips/${trip.id}`}
                  className="tripIndexItem"
                >
                  <TripCoverPhoto coverPhoto={trip.coverPhoto} title={trip.title} />
                  <TripDetail trip={trip} key={trip.id} />
                </Link>
              ))}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TripIndex