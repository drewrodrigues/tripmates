import React from 'react'
import { withRouter } from 'react-router-dom'

import NavContainer from './components/shared/navContainer'

class App extends React.Component {
  render() {
    return (
      <NavContainer />
    )
  }
}

// TODO: review why we're using withRouter here
export default withRouter(App)