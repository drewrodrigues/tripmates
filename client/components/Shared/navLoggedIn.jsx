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
      <div className="Nav">
        <div className="container">
          <nav className="nav nav-pills">
            <NavLink className="Nav-logo" to="/">tripmates</NavLink>
            <NavLink exact className="nav-link" to="/">Trips</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <button className="btn btn-link" onClick={this.handleLogout}>Logout</button>
            <div className="navLoggedIn-right">
              <span className="navLoggedIn-name">
                { this.props.currentUser.firstName }
              </span>
              <img
                src={ this.props.currentUser.profilePicture }
                className="navLoggedIn-profilePicture"
              />
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default NavLoggedIn
