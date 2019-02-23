import { connect } from 'react-redux'
import TripShow from './trip_show'
import { selectTripById } from '../../reducers/selectors'
import { deleteTrip } from '../../actions/trip_actions'

const mapStateToProps = (state, ownProps) => {
  return {trip: selectTripById(state.entities.trips, ownProps.match.params.id)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrip: (trip) => dispatch(deleteTrip(trip)),
    updateTrip: () => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripShow)