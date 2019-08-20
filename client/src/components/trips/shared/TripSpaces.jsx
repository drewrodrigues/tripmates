import React from 'react'
import { prettySpaces } from '../../../helpers/formatters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

const TripSpaces = ({ tripId, spaces, spacesLeft }) => {
  const className = spacesLeft <= -1 ? "badge-green" : "badge-red"
  const iconName = spacesLeft <= -1 ? "user" : "user-minus"

  return (
    <span className={`tripIndexItem-badge badge ${className}`}>
      <FontAwesomeIcon icon={iconName} />
      { prettySpaces(spacesLeft) }
    </span>
  )
}

const mapStateToProps = (state, ownProps) => {
  if (!state.counts.tripCounts[ownProps.tripId]) return {}

  return {
    spacesLeft: state.counts.tripCounts[ownProps.tripId].spacesLeft
  }
}

export default connect(mapStateToProps)(TripSpaces)