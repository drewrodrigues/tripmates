import React from 'react'
import AttendRequest from "./AttendRequest"
import { connect } from "react-redux"
import { getAttendances } from "../../../actions/attendanceActions";

class Attendees extends React.Component {
  componentDidMount() {
    this.props.getAttendances(this.props.tripId)
  }

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
          {this.props.attendences == 0 ?
            <>
              <div>No attendees yet, try inviting some friends!</div>
              <button className="button button-heavy button-green">Invite Friends</button>
            </>
            :
            <ul>
              {this.props.attendances.map(attendance => <li>{ attendance.id }</li>)}
            </ul>
          }
        </div>
      </ul>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    attendances: Object.values(state.entities.attendances)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAttendances: tripId => dispatch(getAttendances(tripId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendees)