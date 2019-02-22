import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import MyTripsContainer from '../Trips/MyTripsContainer';
import SignUp from '../Users/SignUp';
import SignInContainer from '../Users/SignInContainer';

class Nav extends React.Component {
  render() {
    let loggedIn = false;
    console.log(this.props);
    try {
      if (this.props.session.id) {
        loggedIn = true;
      }
    } catch {}
    let nav;

    console.log('run nav');

    if (loggedIn === true) {
      nav = <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/created_trips">Created Trips</NavLink>
        <button onClick={this.props.logout}>Logout</button>
      </>;
    } else {
      nav = <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>;
    }
    
    return (
      <div>
        <HashRouter>
          <nav>
            {this.props.session ? this.props.session.id : ""}
            {nav}

            <Route path="/home" render={Home} />
            <Route path="/about" render={About} />
            <Route path="/created_trips" component={MyTripsContainer} />
            <Route path="/login" component={SignInContainer} />
            <Route path="/signup" component={SignUp} />
          </nav>
        </HashRouter>
      </div>
    );
  }
}

export default Nav;