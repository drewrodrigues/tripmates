import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const NavLoggedOut = () => (
  <div className="Nav">
    <div className="container">
      <nav className="Nav-left">
        <NavLink className="Nav-logo" to="/">tripmates</NavLink>
      </nav>

      <nav className="Nav-center">
        <NavLink to="/explore" exact className="Nav-link Nav-link-primary">Explore</NavLink>
      </nav>

      <nav className="Nav-right">
        <NavLink className="Nav-link Nav-link-primary" to="/login">Login</NavLink>
        <Link className="Nav-link button button-green button-heavy" to="/signup">Sign Up</Link>
      </nav>
    </div>
  </div>
)

export default NavLoggedOut