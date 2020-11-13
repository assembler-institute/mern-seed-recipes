import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";
import thunk from "redux-thunk";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the component is rendered with
export function renderWithRedux(
  component,
  {
    initialState,
    store = createStore(rootReducer, applyMiddleware(thunk), initialState),
  } = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export function renderWithRouter(Component = null, route = "/") {
  const history = createMemoryHistory({ initialEntries: [route] });

  return { App: <Router history={history}>{Component}</Router>, history };
}

export function renderWithReduxAndRouter(
  Component = null,
  route,
  reduxStoreOptions,
) {
  return {
    ...renderWithRedux(
      renderWithRouter(Component, route).App,
      reduxStoreOptions,
    ),
    history: renderWithRouter(Component).history,
  };
}

export function getInitialReduxStoreUserState() {
  return {
    user: {
      currentUser: {
        token: "__token__",
      },
    },
  };
}
