import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const TripLeader = ({leader})  => {
  return (
    <div className="tripLeader">
      <a className="#">
        <FontAwesomeIcon icon="user" />
        {leader.fullName}
      </a>
    </div>
  )
}

export default TripLeader