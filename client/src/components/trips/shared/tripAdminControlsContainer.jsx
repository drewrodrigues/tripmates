import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripAdminControls from './tripAdminControls'
import { deleteTrip } from '../../../actions/tripActions'
import { selectTripById } from '../../../helpers/selectors'
import { isAdminOfTrip } from '../../../helpers/permissions'

const mapStateToProps = (state, ownProps) => {
  const tripId = ownProps.match.params.id
  const trip = selectTripById(state, tripId)
  return {
    isAdmin: isAdminOfTrip(state, trip),
    tripId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTrip: id => dispatch(deleteTrip(id))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TripAdminControls))