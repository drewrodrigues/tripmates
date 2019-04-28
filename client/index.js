import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import createStore from './store/store'

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={createStore()}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  )
})
