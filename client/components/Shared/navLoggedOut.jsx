import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLoggedOut = () => (
  <div className="navbar">
    <div className="container">
      <nav className="nav nav-pills">
        <NavLink className="nav-link logo" to="/">TripMates</NavLink>
        <NavLink className="nav-link" to="/home">Home</NavLink>
        <NavLink className="nav-link" to="/about">About</NavLink>
        <NavLink className="nav-link" to="/login">Login</NavLink>
        <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
      </nav>
    </div>
  </div>
)

export default NavLoggedOut