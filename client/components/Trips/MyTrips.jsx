import React from 'react';
import TripForm from './TripForm';

class MyTrips extends React.Component {
  componentDidMount() {
    this.props.retrieveMyTrips(this.props.currentUserID);
  }

  render() {
    const {trips, createTrip} = this.props;

    return(
      <ul>
        <h3>My Trips</h3>
        <TripForm currentUserID={this.props.currentUserID} createTrip={createTrip}/>
        {trips.map(trip => <li key={trip.id}>{trip.title}</li>)}
      </ul>
    );
  }
}

export default MyTrips;