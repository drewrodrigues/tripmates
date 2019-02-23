import React from 'react'
import NavContainer from './components/shared/nav_container'
import { Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/pages/home'
import About from './components/pages/about'
import MyTripsContainer from './components/trips/my_trips_container'
import TripShowContainer from './components/trips/trip_show_container'
import SignUpContainer from './components/users/sign_up_container'
import SignInContainer from './components/sessions/sign_in_container'

class App extends React.Component {
  render() {
    let user = store.getState().session.id // TODO: why does this work?
    // TODO: once a link is clicked, is this whole thing re-rendered?

    if (user === null) {
      return(
        <div class="container">
          <NavContainer />

          <Switch>
            <Route path="/about" render={About} />
            <Route path="/login" component={SignInContainer} />
            <Route path="/signup" component={SignUpContainer} />
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
            <Route path="/trips/:id" component={TripShowContainer} />
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(App)