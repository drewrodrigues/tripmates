import React from 'react'
import AvatarPlaceholder from '../../assets/avatarPlaceholder.jpg'

const Avatar = ({ image }) => (
  <img
    src={
      image ?
        image
        :
        AvatarPlaceholder
    }
    className="Avatar"
  />
)

export default Avatar