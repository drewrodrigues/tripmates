import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {prettyDaysUntil, prettyDuration, prettyDate, prettySpaces} from '../../helpers/formatters'
import { connect } from 'react-redux'
import { isLeaderOfTrip } from '../../helpers/permissions'
import { isRequestingAttendance, isAttendingTrip } from "../../helpers/selectors"
import TripSpaces from './shared/TripSpaces'
import Avatar from '../users/Avatar'
import { createAttendRequest, deleteAttendRequest } from '../../actions/attendRequestActions'
import { truncate } from "../../helpers/formatters"

const TripDetail = ({
  trip: {
    creator,
    details,
    duration,
    endDate,
    id,
    location,
    spaces,
    startDate,
    privacy,
  },
  truncateDetail,
  isLeader,
  isRequestingAttendance,
  attendRequest,
  createAttendRequest,
  deleteAttendRequest,
  isAttending,
}) => {
  const deleteAttendRequestAndPreventDefault = e => {
    e.preventDefault()
    deleteAttendRequest(attendRequest.id)
  }

  const createAttendRequestAndPreventDefault = e => {
    e.preventDefault()
    createAttendRequest(id)
  }

  return (
    <div className="TripDetail">
      <section className="TripDetail-body">
        <div className="TripDetail-attendance">
          {/* TODO: break into component */}
          {!isLeader && (
            isRequestingAttendance ?
              <button
                className="TripDetail-attendance-status TripDetail-attendance-pending"
                onClick={deleteAttendRequestAndPreventDefault}
              >
                <FontAwesomeIcon icon="user-clock" />
                Join Request Pending
              </button>
              :
              isAttending ?
                <button className="TripDetail-attendance-status TripDetail-attendance-attending">
                  <FontAwesomeIcon icon="check" />
                  Attending
                </button>
                :
                <button
                  className="TripDetail-attendance-status TripDetail-attendance-request"
                  onClick={createAttendRequestAndPreventDefault}
                >
                  <FontAwesomeIcon icon="user-plus" />
                  Ask to Join
                </button>
          )}
        </div>

        <header>
          { privacy == "hidden" && (
            <span className="TripDetail-private">
              <FontAwesomeIcon icon="mask" />
              { privacy[0].toUpperCase() + privacy.slice(1) }
            </span>
          )}

          <h4 className="tripIndexItem-location">
            <FontAwesomeIcon icon="map-marker-alt"/>
            {location}
          </h4>
          <h5 className="tripIndexItem-dates">
            <FontAwesomeIcon icon="calendar-alt" />
            { startDate === endDate ?
              prettyDate(startDate)
            :
              <>
                {prettyDate(startDate)}
                <FontAwesomeIcon icon="long-arrow-alt-right" />
                {prettyDate(endDate)}
              </>
            }
          </h5>
        </header>

        <div className="tripIndexItem-badges">
          <span className="tripIndexItem-badge badge-blue">
            <FontAwesomeIcon icon="hourglass-half" />
            {prettyDaysUntil(startDate)}
          </span>
          <span className="tripIndexItem-badge badge-blue">
            <FontAwesomeIcon icon="clock" />
            {prettyDuration(duration)}
          </span>
          <TripSpaces tripId={id} spaces={spaces} />
        </div>

        <p className="tripIndexItem-description">
          { truncateDetail ? truncate(300, details) : details }
        </p>

        {creator &&
          <div className="tripindexItem-footer">
            <div className="tripIndexItem-footer-left">
              {isLeader ?
                <>
                  <Link to={`/trips/${id}/edit`} className="tripIndexItem-button-edit button button-heavy button-blue">
                    <FontAwesomeIcon icon="edit"/>
                    Edit
                  </Link>
                  <span className="tripIndexItem-led-by">Led by you</span>
                </>
              :
                <>
                  <Avatar image={creator.profilePicture} />
                  <span className="tripIndexItem-led-by">
                    Led by
                    <a className="tripIndexItem-led-by-user"> { creator.fullName }</a>
                  </span>
                </>
              }
            </div>

            <div className="tripIndexItem-footer-right">
              {/*<ul className="tripIndexItem-attendees">*/}
              {/*  <li className="tripIndexItem-attendee">*/}
              {/*    <Avatar image={creator.profilePicture} />*/}
              {/*  </li>*/}
              {/*  <li className="tripIndexItem-attendee">*/}
              {/*    <Avatar image={creator.profilePicture} />*/}
              {/*  </li>*/}
              {/*  <li className="tripIndexItem-attendee">*/}
              {/*    <Avatar image={creator.profilePicture} />*/}
              {/*  </li>*/}
              {/*</ul>*/}
              {/*<p className="tripIndexItem-others-count">+ 23 others</p>*/}
            </div>
          </div>
        }
      </section>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const creator = state.entities.users[ownProps.trip.creatorId]
  return {
    creator,
    isLeader: isLeaderOfTrip(state, ownProps.trip),
    isRequestingAttendance: isRequestingAttendance(state, ownProps.trip),
    isAttending: isAttendingTrip(state, ownProps.trip),
    attendRequest: Object.values(state.entities.attendRequests).find(request => request.userId == state.session.id && request.tripId == ownProps.trip.id)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createAttendRequest: tripId => dispatch(createAttendRequest(tripId)),
    deleteAttendRequest: id => dispatch(deleteAttendRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetail)