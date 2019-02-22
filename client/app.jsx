import React from 'react';
import NavContainer from './components/shared/nav_container';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './components/pages/home';
import About from './components/pages/about';
import MyTripsContainer from './components/trips/my_trips_container';
import SignUp from './components/users/sign_up';
import SignInContainer from './components/sessions/sign_in_container';

class App extends React.Component {
  render() {
    const loggedInRoutes = <>
      <Route path="/home" render={Home} />
      <Route path="/about" render={About} />
      <Route path="/created_trips" component={MyTripsContainer} />
    </>;

    const loggedOutRoutes = <>
      <Route exact path="/about" render={About} />
      <Route exact path="/login" component={SignInContainer} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/" render={Home} />
    </>;

    let user = store.getState().session.id; // TODO: why does this work?
    // TODO: once a link is clicked, is this whole thing re-rendered?

    if (user === null) {
      return(
        <div class="container">
          <NavContainer />

          <Switch>
            <Route path="/about" render={About} />
            <Route path="/login" component={SignInContainer} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" render={Home} />
          </Switch>
        </div>
      );
    } else {
      return(
        <div class="container">
          <NavContainer />

          <Switch>
            <Route path="/home" render={Home} />
            <Route path="/about" render={About} />
            <Route path="/created_trips" component={MyTripsContainer} />
          </Switch>
        </div>
      )
    }
  };
}

export default withRouter(App);