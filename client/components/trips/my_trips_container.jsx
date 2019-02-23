import { connect } from 'react-redux';
import { allTripsSelector } from '../../reducers/selectors';
import MyTrips from './my_trips';
import { retrieveMyTrips, createTrip } from '../../actions/trip_actions'

const mapStateToProps = (state, ownProps) => ({
  trips: allTripsSelector(state),
  currentUserID: state.session.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(id)),
  createTrip: (userId, trip) => dispatch(createTrip(userId, trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips);