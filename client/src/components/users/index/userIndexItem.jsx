import React from 'react'
import FriendRequest from '../../friendRequests/friendRequestContainer'
import AvatarPlaceholder from '../../../assets/avatarPlaceholder.jpg'

const UserIndexItem = ({ user }) => {
  return (
    <>
      <li key={ user.id } className="userIndexItem">
        {user.profilePicture ?
          <img src={ user.profilePicture } className="navLoggedIn-profilePicture userIndexItem-avatar" />
          :
          <img src={AvatarPlaceholder} className="Nav-avatar-placeholder userIndexItem-avatar" />
        }
        <span className="userIndexItem-name">{ `${ user.fullName }` }</span>

        <FriendRequest userId={ user.id } />
      </li>
    </>
  )
}

export default UserIndexItem