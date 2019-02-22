import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from './middleware/thunk';
import rootReducer from './reducers/root_reducer';
import App from './App';

import { retrieveMyTrips } from './actions/trip_actions';

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const { currentUser } = window;
    const { id } = currentUser;
    const preloadedState = {
      session: { id: currentUser.id }
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