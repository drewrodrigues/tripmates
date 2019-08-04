import { connect } from 'react-redux'

import TripIndexItem from './tripIndexItem'
import { isLeaderOfTrip } from '../../../helpers/permissions'

const mapStateToProps = (state, ownProps) => {
  const creator = state.entities.users[ownProps.trip.creatorId]
  console.log(creator)
  return {
    creator,
    isLeader: isLeaderOfTrip(state, ownProps.trip)
  }
}

export default connect(mapStateToProps)(TripIndexItem)