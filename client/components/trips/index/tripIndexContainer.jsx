import { connect } from 'react-redux'

import { tripsByStartDate } from '../../../helpers/selectors'
import TripIndex from './tripIndex'
import { retrieveMyTrips } from '../../../actions/tripActions'

const mapStateToProps = state => ({
  trips: tripsByStartDate(state),
  currentUserID: state.session.id
})

const mapDispatchToProps = dispatch => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIndex)