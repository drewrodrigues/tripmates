import { connect } from 'react-redux'

import { allTripsSelector } from '../../../reducers/selectors'
import TripIndex from './tripIndex'
import { retrieveMyTrips, createTrip } from '../../../actions/tripActions'

const mapStateToProps = state => ({
  trips: allTripsSelector(state),
  currentUserID: state.session.id
})

const mapDispatchToProps = dispatch => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(id)),
  createTrip: (userId, trip) => dispatch(createTrip(userId, trip))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex)