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
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/created_trips">Created Trips</NavLink>
          <button onClick={this.handleLogout}>Logout</button>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      );
    }
  }
}

export default Nav;