import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the component is rendered with
export function renderWithRedux(
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export function renderWithRouter(Component = null) {
  const history = createMemoryHistory();

  return <Router history={history}>{Component}</Router>;
}

export function renderWithReduxAndRouter(Component = null, reduxStoreOptions) {
  return { ...renderWithRedux(renderWithRouter(Component), reduxStoreOptions) };
}

export function getFetchRecipesJSONResponse() {
  const apiResponse = {
    data: [
      {
        _id: "5e777ed1c25d916762a49904",
        difficulty: "Fácil",
        hoursToPrep: 0,
        name: "recipe-1-name",
        description: "recipe-1-description",
        image: "recipe-1-img.jpg",
        serves: 4,
        minutesToPrep: 15,
      },
      {
        _id: "5e777ed1c25d916762a49904",
        difficulty: "Fácil",
        hoursToPrep: 1,
        name: "recipe-2-name",
        description: "recipe-2-description",
        image: "recipe-2-img.jpg",
        serves: 3,
        minutesToPrep: 55,
      },
      {
        _id: "5e777ed1c25d916762a49904",
        difficulty: "Fácil",
        hoursToPrep: 0,
        name: "recipe-3-name",
        description: "recipe-3-description",
        image: "recipe-3-img.jpg",
        serves: 6,
        minutesToPrep: 25,
      },
    ],
    error: null,
  };

  // Results after running through normalizr
  const recipesByID = {
    "5e777ed1c25d916762a49904": {
      _id: "5e777ed1c25d916762a49904",
      difficulty: "Fácil",
      hoursToPrep: 0,
      name: "recipe-1-name",
      description: "recipe-1-description",
      image: "recipe-1-img.jpg",
      serves: 4,
      minutesToPrep: 15,
    },
    "5e777ed1c25d916762a49904": {
      _id: "5e777ed1c25d916762a49904",
      difficulty: "Fácil",
      hoursToPrep: 1,
      name: "recipe-2-name",
      description: "recipe-2-description",
      image: "recipe-2-img.jpg",
      serves: 3,
      minutesToPrep: 55,
    },
    "5e777ed1c25d916762a49904": {
      _id: "5e777ed1c25d916762a49904",
      difficulty: "Fácil",
      hoursToPrep: 0,
      name: "recipe-3-name",
      description: "recipe-3-description",
      image: "recipe-3-img.jpg",
      serves: 6,
      minutesToPrep: 25,
    },
  };

  const recipesIDS = [
    "5e777ed1c25d916762a49904",
    "5e777ed1c25d916762a49904",
    "5e777ed1c25d916762a49904",
  ];

  return {
    apiResponse: apiResponse,
    recipesByID: recipesByID,
    recipesIDS: recipesIDS,
  };
}

export function getFetchSingleRecipeJSONResponse(
  recipeID = "5e777ed1c25d916762a49904",
) {
  return {
    data: {
      _id: recipeID,
      difficulty: "Fácil",
      ingredients: ["ingredient 1", "ingredient 2", "ingredient 3"],
      hoursToPrep: 0,
      comments: [
        {
          _id: "5e7795e51bfa0e70d3c18ec8",
          author: {
            _id: "5e7795d91bfa0e70d3c18ec7",
            name: "name 1",
            lastname: "lastname 1",
          },
          body: "comment_body",
          recipe: "5e777ed1c25d916762a49904",
        },

        {
          _id: "5e7795b11bfa0e70d3c18ec6",
          author: {
            _id: "5e7795b11bfa0e70d3c18ec6",
            name: "name 2",
            lastname: "lastname 2",
          },
          body: "comment_body",
          recipe: "5e777ed1c25d916762a49904",
        },
      ],
      name: "recipe name",
      description: "recipe description",
      image: "recipe-img.jpg",
      serves: 4,
      minutesToPrep: 15,
      author: {
        _id: "5e777ed1c25d916762a498fe",
        name: "author name",
        lastname: "author lastname",
      },
    },
    error: null,
  };
}

export function getNewRecipeTestComment() {
  return {
    _id: "test_comment_id",
    body: "test_comment_body",
    recipe: "test_comment_recipe_id",
    author: {
      _id: "test_comment_author_id",
      name: "test_comment_author_name",
      lastname: "test_comment_lastname",
    },
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
