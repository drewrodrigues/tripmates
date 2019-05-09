import { connect } from 'react-redux'
import { createTrip } from '../../../actions/tripActions'
import TripForm from '../shared/tripForm';

const mapDispatchToProps = dispatch => ({
  action: trip => dispatch(createTrip(trip)),
  actionType: "Create"
})

export default connect(
  null,
  mapDispatchToProps
)(TripForm)