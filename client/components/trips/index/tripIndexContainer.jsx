import { connect } from 'react-redux'

import { allTripsSelector } from '../../../reducers/selectors'
import TripIndex from './tripIndex'
import { retrieveMyTrips } from '../../../actions/tripActions'

const mapStateToProps = state => ({
  trips: allTripsSelector(state),
  currentUserID: state.session.id
})

const mapDispatchToProps = dispatch => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex)