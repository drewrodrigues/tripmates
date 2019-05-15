import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'

const pullUserFromWindow = () => {
  if (window.currentUser) {
    const currentUser = Object.values(window.currentUser)[0]
    const { id } = currentUser
    return {
      entities: { users: { [currentUser.id]: currentUser } },
      session: { id }
    }
  }
}

export default () => {
  const middleware = [thunk, logger]
  const preloadedState = pullUserFromWindow() || {}
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}