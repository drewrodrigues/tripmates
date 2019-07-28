import { connect } from 'react-redux'
import {
  updateTrip,
  getTripById,
  clearTripErrors
} from '../../../actions/tripActions'
import TripForm from '../shared/tripForm';

const mapStateToProps = (state, ownProps) => {
  return {
    actionType: "Update",
    trip: state.entities.trips[ownProps.match.params.id],
    errors: state.errors.tripErrors
  }
}

const mapDispatchToProps = dispatch => ({
  action: trip => dispatch(updateTrip(trip)),
  fetchTrip: id => dispatch(getTripById(id)),
  clearTripErrors: () => dispatch(clearTripErrors)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm)