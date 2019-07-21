import React from 'react'

import Routes from './routes'
import NavLoggedIn from './navLoggedIn'
import NavLoggedOut from './navLoggedOut'

const Nav = props => {
  const { currentUser, logout } = props
  const Nav = currentUser ?

              <NavLoggedIn
                logout={ logout }
                currentUser={ currentUser }
              />
            : <NavLoggedOut />

  return (
    <>
      <h1>Something</h1>
      { Nav }
      <Routes loggedIn={ currentUser } />
    </>
  )
}

export default Nav