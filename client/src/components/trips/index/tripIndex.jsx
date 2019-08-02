import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripIndexItemContainer from './tripIndexItemContainer'
import FriendsPlaceholder from '../../../assets/friends.png'
import WorldPlaceholder from '../../../assets/world.png'

const TripIndexItemLoadingPlaceholder = () => (
  <div className="tripIndexItem-placeholder">
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
          <button className="card-button button button-green button-heavy">Add Friends</button>
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
    this.state = {showForm: false, loading: true}
    this.toggleForm = this.toggleForm.bind(this)
  }

  componentDidMount() {
    this.props.retrieveMyTrips(this.props.currentUserID)
      .then(() => this.setState({loading: false}))
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    const {trips} = this.props

    return(
      <div>
        <div className="tripsIndex">
          <header className="tripIndex-header">
            <div className="tripIndex-header-left">
              <a href="#" className="button button-white">All</a>
            </div>

            <div className="tripIndex-header-center">
              <a href="#" className="button button-white">Past</a>
              <a href="#" className="button button-blue button-heavy">Upcoming</a>
            </div>

            <div classname="tripIndex-header-right">
              <Link to="/trips/new" className="button button-green button-heavy">
                <FontAwesomeIcon icon="plus"/>
                Add Trip
              </Link>
            </div>
          </header>

          {this.state.loading &&
            <>
              <TripIndexItemLoadingPlaceholder />
              <TripIndexItemLoadingPlaceholder />
              <TripIndexItemLoadingPlaceholder />
            </>
          }

          {trips.length === 0 ?
            <TripIndexNoResultsPlaceholder />
            :
            <div className="tripIndexItems">
              {trips.map(trip => (
                <TripIndexItemContainer trip={trip} key={trip.id} />
              ))}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TripIndex