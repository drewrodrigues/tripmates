import React from 'react'
import AttendRequest from "./AttendRequest"
import { connect } from "react-redux"
import { getAttendances } from "../../../actions/attendanceActions"
import Attendee from "./Attendee"
import JustYou from "../../../assets/justyou.svg"
import NoRequests from "../../../assets/request.svg"
import Placeholder from "../../Shared/Placeholder"

class Attendees extends React.Component {
  componentDidMount() {
    this.props.getAttendances(this.props.tripId)
  }

  render() {
    return <div>
      <h3 className="tripShow-body-content-title">Attend Requests</h3>
      <ul className="AttendRequests">
        {this.props.attendRequests.length == 0 ?
          <Placeholder image={NoRequests} title="There are no requests to join" text="Don't worry, they'll flood in soon" />
          :
          this.props.attendRequests.map(attendRequest => (
            <AttendRequest attendRequest={ attendRequest } isLeader={ this.props.isLeader } />
          ))
        }
      </ul>

      <h3 className="tripShow-body-content-title">Attendees</h3>
      <ul className="Attendees">
        <div className="">
          {this.props.attendances.length == 0 ?
            <Placeholder image={JustYou} title="It's just you so far" text="Try inviting your friends or accepting attend requests">
              <button className="button button-heavy button-green">Invite</button>
            </Placeholder>
            :
            <ul>
              {this.props.attendances.map(attendance => <Attendee userId={ attendance.userId } id={ attendance.id } />)}
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