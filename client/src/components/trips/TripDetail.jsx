import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {prettyDaysUntil, prettyDuration, prettyDate, prettySpaces} from '../../helpers/formatters';
import { connect } from 'react-redux'
import { isLeaderOfTrip } from '../../helpers/permissions'
import TripSpaces from './shared/TripSpaces'
import Avatar from '../users/Avatar'

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
  },
  isLeader
}) => {
  return (
    <div className="TripDetail">
      <section className="TripDetail-body">
        <header>
          <h4 className="tripIndexItem-location">{location}</h4>
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
          <TripSpaces spaces={spaces} />
        </div>

        <p className="tripIndexItem-description">
          {details}
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
                    <a className="tripIndexItem-led-by-user"> {creator.firstName} {creator.lastName}</a>
                  </span>
                </>
              }
            </div>

            <div className="tripIndexItem-footer-right">
              <ul className="tripIndexItem-attendees">
                <li className="tripIndexItem-attendee">
                  <Avatar image={creator.profilePicture} />
                </li>
                <li className="tripIndexItem-attendee">
                  <Avatar image={creator.profilePicture} />
                </li>
                <li className="tripIndexItem-attendee">
                  <Avatar image={creator.profilePicture} />
                </li>
              </ul>
              <p className="tripIndexItem-others-count">+ 23 others</p>
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
    isLeader: isLeaderOfTrip(state, ownProps.trip)
  }
}

export default connect(mapStateToProps)(TripDetail)