import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/pages/home'
import About from './components/pages/about'

import NavContainer from './components/shared/navContainer'

import TripIndexContainer from './components/trips/index/tripsIndexContainer'
import TripShowContainer from './components/trips/show/tripShowContainer'

import UsersIndexContainer from './components/users/index/usersIndexContainer'

import SignUpContainer from './components/users/signUpContainer'
import SignInContainer from './components/sessions/signInContainer'

class App extends React.Component {
  render() {
    let user = store.getState().session.id // TODO: why does this work?
    // TODO: once a link is clicked, is this whole thing re-rendered?

    if (user === null) {
      return(
        <>
          <NavContainer />

          <div className="container main">
            <Switch>
              <Route path="/about" render={About} />
              <Route path="/login" component={SignInContainer} />
              <Route path="/signup" component={SignUpContainer} />
              <Route path="/" render={Home} />
            </Switch>
          </div>
        </>
      );
    } else {
      return(
        <>
          <NavContainer />

          <div className="container main">
            <Switch>
              <Route path="/trips/:id" component={TripShowContainer} />
              <Route path="/trips" component={TripIndexContainer} />
              <Route path="/users" component={UsersIndexContainer} />
              <Route path="/" component={TripIndexContainer} />
            </Switch>
          </div>
        </>
      );
    }
  }
}

export default withRouter(App)