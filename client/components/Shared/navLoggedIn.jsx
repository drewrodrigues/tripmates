import React from 'react'
import { NavLink } from 'react-router-dom'

class NavLoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.logout().then(() => {
      this.props.history.push('/login')
    })
  }

  render() {
    return (
      <div className="navbar">
        <div className="container">
          <nav className="nav nav-pills">
            <NavLink className="nav-link logo" to="/">TripMates</NavLink>
            <NavLink exact className="nav-link" to="/">Trips</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <button className="btn btn-link" onClick={this.handleLogout}>Logout</button>
          </nav>
        </div>
      </div>
    )
  }
}

export default NavLoggedIn
