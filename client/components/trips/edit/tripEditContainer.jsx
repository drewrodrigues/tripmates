import { connect } from 'react-redux'
import {
  updateTrip,
  getTripById
} from '../../../actions/tripActions'
import TripForm from '../shared/tripForm';

const mapStateToProps = (state, ownProps) => {
  return {
    actionType: "Update",
    trip: state.entities.trips[ownProps.match.params.id]
  }
}

const mapDispatchToProps = dispatch => ({
  action: trip => dispatch(updateTrip(trip)),
  fetchTrip: id => dispatch(getTripById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm)