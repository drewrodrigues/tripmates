import React from 'react'
import {connect} from 'react-redux'

import TripIndexItem from './tripIndexItem'
import {isAdminOfTrip} from '../../../helpers/permissions';

const mapStateToProps = (state, ownProps) => {
  return {
    creator: state.entities.users[ownProps.trip.creatorId],
    isAdmin: isAdminOfTrip(state, ownProps.trip)
  }
}

export default connect(
  mapStateToProps,
  null
)(TripIndexItem)