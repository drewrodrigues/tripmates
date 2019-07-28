import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripIndexItemContainer from './tripIndexItemContainer'

const TripIndexItemPlaceholder = () => (
  <div className="tripIndexItem-placeholder">
  </div>
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

          { this.state.loading ?
            <>
              <TripIndexItemPlaceholder />
              <TripIndexItemPlaceholder />
              <TripIndexItemPlaceholder />
            </>
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