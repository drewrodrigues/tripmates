import React from 'react'
import FriendRequest from '../../friendRequests/friendRequestContainer'
import Avatar from "../Avatar";

const UserIndexItem = ({ user }) => {
  return (
    <>
      <li key={ user.id } className="userIndexItem">
        <header>
          <Avatar image={ user.profilePicture } />
          <span className="userIndexItem-name">{ `${ user.fullName }` }</span>
        </header>

        <FriendRequest userId={ user.id } />
      </li>
    </>
  )
}

export default UserIndexItem