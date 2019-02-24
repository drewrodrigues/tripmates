import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from './middleware/thunk';
import rootReducer from './reducers/rootReducer';
import App from './App';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const currentUser = Object.values(window.currentUser)[0];
    const { id } = currentUser;
    const preloadedState = {
      entities: { users: { id: currentUser } },
      session: { id }
    };
    store = createStore(rootReducer, preloadedState, applyMiddleware(logger, thunk));
  } else {
    store = createStore(rootReducer, applyMiddleware(logger, thunk));
  }

  window.store = store;
  
  render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  );
});