import React from 'react'
import { NavLink } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class NavLoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.state = { showDropDown: false }
  }

  handleLogout() {
    this.props.logout().then(() => {
      this.props.history.push('/login')
    })
  }

  toggleDropDown() {
    console.log('do the things');
    this.setState({ showDropDown: !this.state.showDropDown })
  }

  render() {
    const dropDownOpenClass = this.state.showDropDown ? "open" : ""
    
    return (
      <div className="Nav">
        <div className="container">
          <nav className="Nav-left">
            <NavLink className="Nav-logo" to="/">tripmates</NavLink>
          </nav>
          <nav className="Nav-right">
            <NavLink exact className="Nav-link" to="/">Trips</NavLink>
            <NavLink className="Nav-link" to="/users">Users</NavLink>

            <nav href="#" className={`Nav-user ${dropDownOpenClass}`} onClick={this.toggleDropDown }>
              <span className="navLoggedIn-name">
                { this.props.currentUser.firstName }
              </span>
              <img
                src={ this.props.currentUser.profilePicture }
                className="Nav-avatar"
              />

              { this.state.showDropDown && (
                <ul className="Nav-dropdown">
                  <li><a href="#" className="Nav-dropdown-link">
                    <FontAwesomeIcon icon="cog" />
                    Settings
                  </a></li>
                  <li><a className="Nav-dropdown-link" onClick={this.handleLogout}>
                    <FontAwesomeIcon icon="sign-out-alt" />
                    Logout
                  </a></li>
                </ul>
              )}
            </nav>

          </nav>
        </div>
      </div>
    )
  }
}

export default NavLoggedIn
