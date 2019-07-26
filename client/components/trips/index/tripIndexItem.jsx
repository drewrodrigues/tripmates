import React from 'react'
import {Link} from 'react-router-dom'

const TripIndexItem = (props) => {
  const {
    id,
    daysUntil,
    duration,
    title,
    coverPhoto,
    location,
    creator,
    startDate,
    endDate
  } = props.trip

  return (
    <Link
      to={ `/trips/${id}` }
      className="tripIndexItem"
    >

      <section className="tripIndexItem-photo" style={{"backgroundImage": `url(${coverPhoto})`}}>
        <h3  className="tripIndexItem-title">{ title }</h3>
      </section>

      <section className="tripIndexItem-body">
        <h4 className="tripIndexItem-location">{location}</h4>
        <h5 className="tripIndexItem-dates">{startDate} - {endDate}</h5>

        <div className="tripIndexItem-badges">
          <span className="tripIndexItem-badge tripIndexItem-badge-blue">{daysUntil} days until</span>
          <span className="tripIndexItem-badge tripIndexItem-badge-blue">{duration} days long</span>
          <span className="tripIndexItem-badge tripIndexItem-badge-red">3 spots left</span>
        </div>

        <p className="tripIndexItem-description">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>

        <div className="tripindexItem-footer">
          <div className="tripIndexItem-footer-left">
            {props.isAdmin ?
              <>
                <Link to={`/trips/${id}/edit`} className="tripIndexItem-button-edit">Edit</Link>
                <span className="tripIndexItem-led-by">Led by you</span>
              </>
            :
              <>
                <img
                  src={ creator.profilePicture }
                  className="tripIndexItem-leader-avatar"
                />
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
                <img src={ creator.profilePicture } className="tripIndexItem-attendee-avatar" />
              </li>
              <li className="tripIndexItem-attendee">
                <img src={ creator.profilePicture } className="tripIndexItem-attendee-avatar" />
              </li>
              <li className="tripIndexItem-attendee">
                <img src={ creator.profilePicture } className="tripIndexItem-attendee-avatar" />
              </li>
            </ul>
            <p className="tripIndexItem-others-count">+ 23 others</p>
          </div>
        </div>
      </section>

    </Link>
  )
}

export default TripIndexItem