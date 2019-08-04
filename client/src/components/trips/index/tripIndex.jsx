import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripDetail from "../TripDetail"
import FriendsPlaceholder from '../../../assets/friends.png'
import WorldPlaceholder from '../../../assets/world.png'
import Loader from "../../../assets/loader.gif";
import TripCoverPhoto from '../TripCoverPhoto';

const TripIndexItemLoadingPlaceholder = () => (
  <div className="tripIndexItem-placeholder">
    <img src={Loader} alt="Loading" />
    <p>Loading</p>
  </div>
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

class TripIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
    this.searchPastTrips = this.searchPastTrips.bind(this)
    this.searchUpcomingTrips = this.searchUpcomingTrips.bind(this)
  }

  componentWillUnmount() {
    this.props.clearTrips()
  }

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.search()
    }
  }

  search() {
    this.props.clearTrips()
    this.setState({loading: true})
    switch (this.props.match.path) {
      case "/":
        this.searchUpcomingTrips()
        break
      case "/trips/all":
        this.props.retrieveMyTrips()
      case "/trips/upcoming":
        this.searchUpcomingTrips()
        break
      case "/trips/past":
        this.searchPastTrips()
        break
      default:
        this.searchUpcomingTrips()
        break
    }
  }

  searchAllTrips() {
    this.props.retrieveMyTrips()
      .then(() => this.doneLoading())
  }

  searchPastTrips() {
    this.props.searchTrips({when: "past", date: new Date()})
      .then(() => this.doneLoading())
  }

  searchUpcomingTrips() {
    this.props.searchTrips({when: "upcoming", date: new Date()})
      .then(() => this.doneLoading())
  }

  doneLoading() {
    this.setState({loading: false})
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
              <NavLink to="/trips/past" exact className="tripIndex-button button button-white" onClick={this.searchPastTrips} activeClassName="button-blue button-heavy">
                <FontAwesomeIcon icon="history"/>
                Past
              </NavLink>
              <NavLink to="/trips/all" exact className="tripIndex-button button button-white" onClick={this.props.retrieveMyTrips} activeClassName="button-blue button-heavy">
                All
              </NavLink>
              <NavLink to="/" exact className="tripIndex-button button button-white" onClick={this.searchUpcomingTrips} activeClassName="button-blue button-heavy">
                <FontAwesomeIcon icon="angle-double-right"/>
                Upcoming
              </NavLink>
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
                <div className="tripIndexItem">
                  <Link
                    to={`/trips/${trip.id}`}
                  >
                    <TripCoverPhoto coverPhoto={trip.coverPhoto} title={trip.title} />
                    <TripDetail trip={trip} key={trip.id} />
                  </Link>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TripIndex