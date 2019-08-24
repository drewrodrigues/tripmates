import React from "react"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import createStore from "./store"
import "./initializers/fontAwesome"
import "./middleware/axios"
import NavContainer from "./components/Shared/navContainer"

const store = createStore()

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <NavContainer />
    </HashRouter>
  </Provider>
)

export default App
