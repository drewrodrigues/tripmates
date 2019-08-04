import React from 'react'
import { prettySpaces } from '../../../helpers/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TripSpaces = ({ spaces }) => {
  const className = spaces == 0 ? "badge-green" : "badge-red"
  const iconName = spaces == 0 ? "user" : "user-minus"

  return (
    <span className={`tripIndexItem-badge badge ${className}`}>
      <FontAwesomeIcon icon={iconName} />
      { prettySpaces(spaces) }
    </span>
  )
}

export default TripSpaces