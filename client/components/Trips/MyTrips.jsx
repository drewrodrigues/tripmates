import React from 'react';
import TripForm from './TripForm';

class MyTrips extends React.Component {
  componentDidMount() {
    this.props.retrieveMyTrips(this.props.currentUserID);

    this.deleteTrip = this.deleteTrip.bind(this);
  }

  deleteTrip(trip) {
    this.props.deleteTrip(trip);
  }

  render() {
    const {trips, createTrip} = this.props;
    const { deleteTrip } = this;

    return(
      <ul>
        <h3>My Trips</h3>
        <TripForm currentUserID={this.props.currentUserID} createTrip={createTrip}/>
        {trips.map(trip => (
          <li key={trip.id}>
            {trip.title}
            <button onClick={() => deleteTrip(trip)}>X</button>
          </li>)
        )}
      </ul>
    );
  }
}

export default MyTrips;