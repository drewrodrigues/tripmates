import { connect } from 'react-redux'
import { createTrip, clearTripErrors } from '../../../actions/tripActions'
import TripForm from '../shared/tripForm'

const mapStateToProps = state => ({
  actionType: "Create",
  errors: state.errors.tripErrors
})

const mapDispatchToProps = dispatch => ({
  action: trip => dispatch(createTrip(trip)),
  clearTripErrors: () => dispatch(clearTripErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(TripForm)