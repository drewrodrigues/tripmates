import { connect } from 'react-redux';
import { allTripsSelector } from '../../reducers/selectors';
import MyTrips from './my_trips';
import { retrieveMyTrips, createTrip, deleteTrip } from '../../actions/trip_actions';

const mapStateToProps = (state, ownProps) => ({
  trips: allTripsSelector(state.entities.trips),
  currentUserID: state.session.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(id)),
  createTrip: (userId, trip) => dispatch(createTrip(userId, trip)),
  deleteTrip: (trip) => dispatch(deleteTrip(trip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips);