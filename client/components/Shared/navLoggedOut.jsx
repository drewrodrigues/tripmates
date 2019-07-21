import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLoggedOut = () => (
  <div className="Nav">
    <div className="container">
      <nav className="nav nav-pills">
        <NavLink className="Nav-logo" to="/">tripmates</NavLink>
        <NavLink className="nav-link" to="/home">Home</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
      </nav>
    </div>
  </div>
)

export default NavLoggedOut