import React from 'react'
import AttendRequest from "./AttendRequest"

class Attendees extends React.Component {
  render() {
    return <div>
      <h3 className="tripShow-body-content-title">Attend Requests</h3>
      <ul className="AttendRequests">
        {this.props.attendRequests.map(attendRequest => (
          <AttendRequest attendRequest={ attendRequest } isLeader={this.props.isLeader} />
        ))}
      </ul>

      <h3 className="tripShow-body-content-title">Attendees</h3>
      <ul className="Attendees">
        <div className="Attendees-placeholder">
          <div>No attendees yet, try inviting some friends!</div>
          <button className="button button-heavy button-green">Invite Friends</button>
        </div>
      </ul>
    </div>
  }
}

export default Attendees