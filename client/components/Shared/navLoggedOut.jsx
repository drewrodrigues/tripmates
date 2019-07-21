import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLoggedOut = () => (
  <div className="Nav">
    <div className="container">
      <nav className="Nav-left">
        <NavLink className="Nav-logo" to="/">tripmates</NavLink>
      </nav>

      <nav className="Nav-right">
        <NavLink className="Nav-link" to="/home">Home</NavLink>
        <NavLink className="Nav-link" to="/about">About</NavLink>
        <NavLink className="Nav-link" to="/login">Login</NavLink>
        <NavLink className="Nav-link" to="/signup">Sign Up</NavLink>
      </nav>
    </div>
  </div>
)

export default NavLoggedOut