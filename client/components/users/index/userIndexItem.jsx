import React from 'react'
import FriendRequest from '../../friendRequests/friendRequestContainer'

const UserIndexItem = ({ user }) => {
  return (
    <li key={ user.id } className="list-group-item">
      <img src={ user.profilePicture } className="navLoggedIn-profilePicture" />
      { `${ user.firstName } ${ user.lastName }` } {/* TODO: formatter */}
      <br/>

      <FriendRequest userId={ user.id } />
    </li>
  )
}

export default UserIndexItem