import React from 'react'
import Avatar from "./Avatar";

const UserLineItem = ({ firstName, lastName, fullName, profilePicture, children }) => {
  return (
    <div className="UserLineItem">
      <header className="UserLineItem-main">
        <Avatar image={ profilePicture } />
        <p>{ fullName }</p>
      </header>

      { children && <div className="UserLineItem-right">
        { children }
      </div>}
    </div>
  )
}

export default UserLineItem