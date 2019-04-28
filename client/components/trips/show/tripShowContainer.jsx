import { connect } from 'react-redux'
import TripShow from './tripShow'
import { selectTripById } from '../../../reducers/selectors'
import { deleteTrip, getTripById } from '../../../actions/tripActions'

const mapStateToProps = (state, ownProps) => {
  return {
    trip: selectTripById(state, ownProps.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrip: trip => dispatch(deleteTrip(trip)),
    getTripById: id => dispatch(getTripById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripShow)