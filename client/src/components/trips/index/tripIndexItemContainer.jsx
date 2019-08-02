import React from 'react'
import {connect} from 'react-redux'

import TripIndexItem from './tripIndexItem'
import {isLeaderOfTrip} from '../../../helpers/permissions';

const mapStateToProps = (state, ownProps) => {
  return {
    creator: state.entities.users[ownProps.trip.creatorId],
    isLeader: isLeaderOfTrip(state, ownProps.trip)
  }
}

export default connect(mapStateToProps)(TripIndexItem)