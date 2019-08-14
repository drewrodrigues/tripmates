import { connect } from 'react-redux'
import TripShow from './tripShow'
import { selectTripById } from '../../../helpers/selectors'
import { isLeaderOfTrip } from '../../../helpers/permissions'
import { getTripById } from '../../../actions/tripActions'

const mapStateToProps = (state, ownProps) => {
  const trip = selectTripById(state, ownProps.match.params.id)
  return {
    trip,
    leader: state.entities.users[trip.creatorId],
    isLeader: isLeaderOfTrip(state, trip),
    attendRequests: Object.values(state.entities.attendRequests).filter(request => request.tripId == trip.id) || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTripById: id => dispatch(getTripById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripShow)