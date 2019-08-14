import React from 'react'

const UserLineItem = ({ firstName, lastName, fullName, profilePicture, children }) => {
  return (
    <div className="UserLineItem">
      <header className="UserLineItem-main">
        <img src={ profilePicture } alt="User profile picture" className="Nav-avatar"/>
        <p>{ fullName }</p>
      </header>

      { children && <div className="UserLineItem-right">
        { children }
      </div>}
    </div>
  )
}

export default UserLineItem