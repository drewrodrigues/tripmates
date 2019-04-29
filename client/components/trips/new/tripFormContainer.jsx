import { connect } from 'react-redux'
import TripForm from './tripForm';

const mapDispatchToProps = dispatch => ({
  createTrip: (userId, trip) => dispatch(createTrip(userId, trip))
})

export default connect(
  null,
  mapDispatchToProps
)(TripForm)