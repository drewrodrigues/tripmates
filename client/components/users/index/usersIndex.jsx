import React from 'react'
import FriendRequest from '../../friendRequests/friendRequestContainer'

class UsersIndex extends React.Component {
  componentDidMount() {
    // TODO: query for all users, other than myself
    // TODO: getAllUsersWithFriendRequestData
    this.props.getAllUsers()
    this.props.getAllFriendRequests()
  }
  
  render() {
  return (
      <ul className="list-group">
        {this.props.users.map(user => (
          <li key={user.id} className="list-group-item">
            {user.fullName}
            <br/>

            <FriendRequest userId={user.id} />
          </li>
        ))}
      </ul>
    )
  }
}

export default UsersIndex