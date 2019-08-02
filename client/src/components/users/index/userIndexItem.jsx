import React from 'react'
import FriendRequest from '../../friendRequests/friendRequestContainer'
import AvatarPlaceholder from '../../../assets/avatarPlaceholder.jpg'

const UserIndexItem = ({ user }) => {
  return (
    <li key={ user.id } className="list-group-item">
      {user.profilePicture ?
        <img src={ user.profilePicture } className="navLoggedIn-profilePicture" />
        :
        <img src={AvatarPlaceholder} className="Nav-avatar-placeholder" />
      }
      { `${ user.firstName } ${ user.lastName }` } {/* TODO: formatter */}

      <FriendRequest userId={ user.id } />
    </li>
  )
}

export default UserIndexItem