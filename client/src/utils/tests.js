import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";
import thunk from "redux-thunk";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the component is rendered with
export function renderWithReduxAndRouter(
  component,
  route = "/",
  {
    initialState,
    store = createStore(rootReducer, applyMiddleware(thunk), initialState),
  } = {},
) {
  window.history.pushState({}, "Test page", route);
  return {
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: BrowserRouter,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
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
