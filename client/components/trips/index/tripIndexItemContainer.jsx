import React from 'react'
import { connect } from 'react-redux'

import TripIndexItem from './tripIndexItem'

const mapStateToProps = (state, ownProps) => {
  const creator = state.entities.users[ownProps.trip.creatorId]
  return {
    creator,
    isLeader: creator.id === state.session.id
  }
}

export default connect(mapStateToProps)(TripIndexItem)