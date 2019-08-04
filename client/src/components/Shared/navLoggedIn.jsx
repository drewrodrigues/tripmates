import React from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AvatarPlaceholder from '../../assets/avatarPlaceholder.jpg'

class NavLoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.hideDropDown = this.hideDropDown.bind(this)
    this.isTripNavActive = this.isTripNavActive.bind(this)
    this.state = {showDropDown: false}
  }

  handleLogout() {
    this.props.logout().then(() => {
      this.props.history.push('/login')
    })
  }

  hideDropDown() {
    if (!this.state.hideDropDown) {
      this.setState({showDropDown: false})
    }
  }

  toggleDropDown() {
    this.setState({ showDropDown: !this.state.showDropDown })
  }

  isTripNavActive() {
    const url = this.props.location.pathname
    return url.match('trips') || url === "/"
  }

  render() {
    const dropDownOpenClass = this.state.showDropDown ? "open" : ""

    return (
      <div className="Nav">
        <div className="container">
          <nav className="Nav-left">
            <NavLink className="Nav-logo" to="/">tripmates</NavLink>
          </nav>

          <nav className="Nav-center">
            <NavLink to="/explore" exact className="Nav-link Nav-link-primary">
              <FontAwesomeIcon icon="compass" />
              Explore
            </NavLink>
          </nav>

          <nav className="Nav-right">
            <NavLink className="Nav-link Nav-link-primary" to="/" isActive={this.isTripNavActive}>
              <FontAwesomeIcon icon="globe-americas" />
              Trips
            </NavLink>
            <NavLink className="Nav-link Nav-link-primary" to="/friends" exact>
              <FontAwesomeIcon icon="users" />
              Friends
            </NavLink>

            <nav href="#"
              className={`Nav-user ${dropDownOpenClass}`}
              onClick={this.toggleDropDown}
              onMouseLeave={this.hideDropDown}
            >
              <img
                src={
                  this.props.currentUser.profilePicture ?
                    this.props.currentUser.profilePicture
                    :
                    AvatarPlaceholder
                }
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

export default withRouter(NavLoggedIn)