import {connect} from 'react-redux'
import TripShow from './tripShow'
import {selectTripById} from '../../../helpers/selectors'
import {deleteTrip, getTripById} from '../../../actions/tripActions'

const mapStateToProps = (state, ownProps) => {
  const trip = selectTripById(state, ownProps.match.params.id)
  return {
    trip,
    leader: state.entities.users[trip.creatorId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrip: id => dispatch(deleteTrip(id)),
    getTripById: id => dispatch(getTripById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripShow)