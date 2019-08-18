import React from 'react'
import AttendRequest from "./AttendRequest"
import { connect } from "react-redux"
import { getAttendances, clearAttendances } from "../../../actions/attendanceActions"
import Attendee from "./Attendee"
import JustYou from "../../../assets/justyou.svg"
import NoRequests from "../../../assets/request.svg"
import Placeholder from "../../Shared/Placeholder"
import {clearAttendRequests} from "../../../actions/attendRequestActions"
import {handleLoading} from "../../../helpers/handlers"
import Loader from "../../Shared/Loader";

// TODO: query for attend reqeusts (since it's only coming from the trip itself

class Attendees extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this.handleLoading = handleLoading.bind(this)
  }

  componentDidMount() {
    // this.props.getAttendances(this.props.tripId)
    this.handleLoading(() => this.props.getAttendances(this.props.tripId))
  }

  componentWillUnmount() {
    this.props.clearAttendances()
    // TODO: once we actually query for attend requests
    // this.props.clearAttendRequests()
  }

  render() {
    if (this.state.loading) return <Loader />

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
    getAttendances: tripId => dispatch(getAttendances(tripId)),
    clearAttendances: () => dispatch(clearAttendances()),
    clearAttendRequests: () => dispatch(clearAttendRequests())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendees)