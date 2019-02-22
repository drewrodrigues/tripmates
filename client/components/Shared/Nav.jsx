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
        <ul class="nav nav-pills">
          <li class="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
          <li class="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li class="nav-item"><NavLink className="nav-link" to="/created_trips">Created Trips</NavLink></li>
          <button className="btn btn-link float-right" onClick={this.handleLogout}>Logout</button>
        </ul>
      );
    } else {
      return (
        <ul class="nav nav-pills">
          <li class="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
          <li class="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
          <li class="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
        </ul>
      );
    }
  }
}

export default Nav;