import { connect } from 'react-redux'
import friendRequest from './friendRequest'
import {
  checkIfFriend,
  checkIfRequested,
  checkIfFriendRequestPending,
  friendRecordId,
  friendRequestId
} from '../../helpers/selectors'
import {
  deleteFriendRequest,
  createFriendRequest,
} from '../../actions/friendRequestActions'
import { addFriend, deleteFriend } from "../../actions/friendActions"

const mapStateToProps = (state, ownProps) => {
  return {
    isFriend: checkIfFriend(state, ownProps.userId),
    isRequested: checkIfRequested(state, ownProps.userId),
    friendRequestPending: checkIfFriendRequestPending(state, ownProps.userId),
    friendRecordId: friendRecordId(state, ownProps.userId),
    friendRequestId: friendRequestId(state, ownProps.userId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelRequest: (id) => dispatch(deleteFriendRequest(id)),
    addRequest: () => dispatch(createFriendRequest(ownProps.userId)),
    addFriend: friendRequestId => dispatch(addFriend(friendRequestId)),
    deleteFriend: friendRecordId => dispatch(deleteFriend(friendRecordId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(friendRequest)