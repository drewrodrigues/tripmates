import { connect } from 'react-redux';
import { myTrips } from '../../reducers/selectors';
import MyTrips from './MyTrips';
import { retrieveMyTrips } from '../../actions/trip_actions';

const mapStateToProps = state => ({
  trips: myTrips(state.entities.trips)
});

const mapDispatchToProps = dispatch => ({
  retrieveMyTrips: (id) => dispatch(retrieveMyTrips(13))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips);