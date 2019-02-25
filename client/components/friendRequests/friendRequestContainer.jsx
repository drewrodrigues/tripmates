import { connect } from 'react-redux'
import friendRequest from './friendRequest'
import {
  checkIfFriend,
  checkIfRequested,
  checkIfFriendRequestPending,
  selectFriendRequest
} from '../../reducers/selectors'
import {
  deleteFriendRequest,
  createFriendRequest,
} from '../../actions/friendRequestActions'

const mapStateToProps = (state, ownProps) => {
  return {
    // TODO: fetch this record first before getting other props?
    // isFriend: checkIfFriend(state, ownProps.userId),
    friendRequest: selectFriendRequest(state, ownProps.userId),
    isRequested: checkIfRequested(state, ownProps.userId), // TODO: pull these into state? based upon currentUser passed down and the record that was found
    friendRequestPending: checkIfFriendRequestPending(state, ownProps.userId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelRequest: (id) => dispatch(deleteFriendRequest(id)),
    addRequest: () => dispatch(createFriendRequest(ownProps.userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(friendRequest)