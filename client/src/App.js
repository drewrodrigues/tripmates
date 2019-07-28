import React, { Component } from 'react'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import createStore from './store'

import NavContainer from './components/Shared/navContainer'

const App = () => (
  <Provider store={createStore()}>
    <HashRouter>
      <NavContainer />
    </HashRouter>
  </Provider>
)

export default App