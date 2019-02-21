import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import thunk from './middleware/thunk';
import rootReducer from './reducers/root_reducer';
import App from './App';

import { retrieveMyTrips } from './actions/trip_actions';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
window.store = store;

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});