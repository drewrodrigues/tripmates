import React from 'react';

class MyTrips extends React.Component {
  componentDidMount() {
    this.props.retrieveMyTrips();
  }

  render() {
    const trips = this.props.trips;

    return(
      <ul>
        <h3>My Trips</h3>
        {trips.map(trip => <li key={trip.id}>{trip.title}</li>)}
      </ul>
    );
  }
}

export default MyTrips;