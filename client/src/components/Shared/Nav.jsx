import React from 'react'

import Routes from './routes'
import NavLoggedIn from './navLoggedIn'
import NavLoggedOut from './navLoggedOut'

const Nav = props => {
  const {currentUser, logout} = props

  return (
    <>
      {currentUser ?
      <NavLoggedIn
        logout={ logout }
        currentUser={ currentUser }
      />
      :
      <NavLoggedOut />}

      <Routes loggedIn={ currentUser } />
    </>
  )
}
export default Nav
