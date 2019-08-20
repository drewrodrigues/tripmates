import React from 'react'
import { prettySpaces } from '../../../helpers/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TripSpaces = ({ spaces, spacesLeft }) => {
  let className = spacesLeft == 0 ? "badge-red" : "badge-green"
  let iconName = spacesLeft <= -1 ? "user" : "user-minus"
  let text

  if (spacesLeft <= -1) {
    text = "Unlimited space"
  } else if (spacesLeft == 0) {
    text = "No space left"
  } else {
    text = prettySpaces(spacesLeft)
  }

  return (
    <span className={`tripIndexItem-badge badge ${className}`}>
      <FontAwesomeIcon icon={iconName} />
      { text }
    </span>
  )
}

export default TripSpaces