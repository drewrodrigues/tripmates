import { logger } from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
import { createStore, applyMiddleware, compose } from "redux"

const pullUserFromWindow = () => {
  if (localStorage.getItem("session")) {
    const currentUser = JSON.parse(localStorage.getItem("session"))
    const { id } = Object.values(currentUser)[0]
    return {
      entities: { users: { ...currentUser } },
      session: { id }
    }
  }
}

export default () => {
  const middleware = [thunk, logger]
  const preloadedState = pullUserFromWindow() || {}
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  )
}
