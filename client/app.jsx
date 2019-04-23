import React from 'react'

import NavContainer from './components/shared/navContainer'

class App extends React.Component {
  render() {
    return (
      <NavContainer />
    )
  }
}

export default withRouter(App)