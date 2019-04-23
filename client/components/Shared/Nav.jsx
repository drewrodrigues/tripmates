import React from 'react';

import Routes from './routes'
import NavLoggedIn from './navLoggedIn'
import NavLoggedOut from './navLoggedOut'

class Nav extends React.Component {  
  render() {
    const { currentUser, logout } = this.props;
    const Nav = currentUser ? <NavLoggedIn logout={ logout } /> : <NavLoggedOut />

    return (
      <>
        { Nav }
        <Routes loggedIn={ currentUser }/>
      </>
    )
  }
}

export default Nav;