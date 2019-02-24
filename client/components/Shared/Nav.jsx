import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {  
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    let that = this;
    this.props.logout().then(() => {
      that.props.history.push('/login');
    });
  }

  render() {
    const { currentUser } = this.props;
    let nav;

    if (currentUser !== null) {
      return (
        <div class="navbar">
          <div class="container">
            <nav className="nav nav-pills">
              <NavLink className="nav-link logo" to="/">TripMates</NavLink>
              <NavLink exact className="nav-link" to="/">Trips</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <button className="btn btn-link" onClick={this.handleLogout}>Logout</button>
            </nav>
          </div>
        </div>
      );
    } else {
      return (
        <div class="navbar">
          <div class="container">
            <nav className="nav nav-pills">
              <NavLink className="nav-link logo" to="/">TripMates</NavLink>
              <NavLink className="nav-link" to="/home">Home</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </nav>
          </div>
        </div>
      );
    }
  }
}

export default Nav;