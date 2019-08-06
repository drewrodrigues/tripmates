import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripDetail from "../TripDetail"
import FriendsPlaceholder from '../../../assets/friends.png'
import WorldPlaceholder from '../../../assets/world.png'
import TripCoverPhoto from '../TripCoverPhoto';
import Loader from "../../Shared/Loader"
import queryString from "query-string"

const TripIndexItemLoadingPlaceholder = () => (
  <Loader />
)

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

const defaultState = { loading: false, queryWhen: "all", queryLedBy: "anyone" }

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
    const query = queryString.parse(this.props.location.search)
    const queryWhen = query.when || "all"
    const queryLedBy = query.ledBy || "anyone"
    this.setState({ queryWhen, queryLedBy })
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
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
            <div className="tripIndex-header-left">
              <a href="#" className="button button-white">
                <FontAwesomeIcon icon="filter"/>
                All
              </a>
            </div>

            <div className="tripIndex-header-center">
              <button to="/trips/past"
                className={`
                  tripIndex-button button button-white
                  ${this.state.queryWhen == 'past' ? "button-blue button-heavy" : ""}`
                }
                onClick={this.updateFilters('queryWhen', 'past')}
              >
                <FontAwesomeIcon icon="history"/>
                Past
              </button>
              <button to="/trips/all"
                className={`
                  tripIndex-button button button-white
                  ${this.state.queryWhen == 'all' ? "button-blue button-heavy" : ""}`
                }
                onClick={this.updateFilters('queryWhen', 'all')}
              >
                All
              </button>
              <button to="/"
                className={`
                  tripIndex-button button button-white
                  ${this.state.queryWhen == 'upcoming' ? "button-blue button-heavy" : ""}`
                }
                onClick={this.updateFilters('queryWhen', 'upcoming')}
              >
                <FontAwesomeIcon icon="angle-double-right"/>
                Upcoming
              </button>
            </div>

            <div className="tripIndex-header-right">
              <Link to="/trips/new" className="button button-green button-heavy">
                <FontAwesomeIcon icon="plus"/>
                Add Trip
              </Link>
            </div>
          </header>

          {this.state.loading && <TripIndexItemLoadingPlaceholder />}

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