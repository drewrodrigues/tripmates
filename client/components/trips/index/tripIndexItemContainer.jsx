import React from 'react'
import { connect } from 'react-redux'

import TripIndexItem from './tripIndexItem'

const mapStateToProps = (state, ownProps) => {
  return {
    creator: state.entities.users[ownProps.trip.creatorId]
  }
}

export default connect(
  mapStateToProps,
  null
)(TripIndexItem)