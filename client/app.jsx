import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/pages/home'
import About from './components/pages/about'

import NavContainer from './components/shared/navContainer'

import TripIndexContainer from './components/trips/index/tripsIndexContainer'
import TripShowContainer from './components/trips/show/tripShowContainer'

import SignUpContainer from './components/users/signUpContainer'
import SignInContainer from './components/sessions/signInContainer'

class App extends React.Component {
  render() {
    let user = store.getState().session.id // TODO: why does this work?
    // TODO: once a link is clicked, is this whole thing re-rendered?

    if (user === null) {
      return(
        <div class="row">
          <div class="col-md-2">
            <NavContainer />
          </div>

          <div class="col-md-10 offset-md-2 main">
            <Switch>
              <Route path="/about" render={About} />
              <Route path="/login" component={SignInContainer} />
              <Route path="/signup" component={SignUpContainer} />
              <Route path="/" render={Home} />
            </Switch>
          </div>
        </div>
      );
    } else {
      return(
        <div class="row">
          <div class="sidebar col-md-2">
            <NavContainer />
          </div>

          <div class="main col-md-10 offset-md-2">
            <div class="">
              <Switch>
                <Route path="/home" render={Home} />
                <Route path="/about" render={About} />
                <Route path="/created_trips" component={TripIndexContainer} />
                <Route path="/trips/:id" component={TripShowContainer} />
              </Switch>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(App)