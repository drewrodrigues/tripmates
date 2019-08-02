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
    isLeader: isLeaderOfTrip(state, trip)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTripById: id => dispatch(getTripById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripShow)