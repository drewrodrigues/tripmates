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
        <nav className="nav flex-column nav-pills">
          <NavLink className="nav-link" to="/home">Home</NavLink>
          <NavLink className="nav-link" to="/about">About</NavLink>
          <NavLink className="nav-link" to="/created_trips">Created Trips</NavLink>
          <button className="btn btn-link" onClick={this.handleLogout}>Logout</button>
        </nav>
      );
    } else {
      return (
        <nav className="nav flex-column nav-pills">
          <NavLink className="nav-link" to="/home">Home</NavLink>
          <NavLink className="nav-link" to="/about">About</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </nav>
      );
    }
  }
}

export default Nav;