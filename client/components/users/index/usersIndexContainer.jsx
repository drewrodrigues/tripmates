import { connect } from 'react-redux'
import UsersIndex from './usersIndex'

import { selectAllOtherUsers, selectAllFriendRequests, selectAllRequestedFriends } from '../../../helpers/selectors'
import { getAllUsers } from '../../../actions/userActions'

import { getAllFriendRequests } from '../../../actions/friendRequestActions'

const mapStateToProps = state => {
  return {
    users: selectAllOtherUsers(state),
    requestedFriends: selectAllRequestedFriends(state),
    friendRequests: selectAllFriendRequests(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllFriendRequests: () => dispatch(getAllFriendRequests())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)