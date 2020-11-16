import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import {
  fetchRecipes,
  fetchRecipe,
  addRecipeComment,
} from "../recipes-actions";
import RecipesTypes from "../recipes-types";

import { getInitialReduxStoreUserState } from "../../../utils/tests";

import allRecipesResponse from "../../../__mocks__/recipes/all-recipes.json";
import singleRecipeResponse from "../../../__mocks__/recipes/single-recipe.json";
import recipeCommentResponse from "../../../__mocks__/recipes/recipe-comments.json";

import makeTestingServer from "../../../__mocks__/recipes/mock-recipes-service";

const recipesData = {
  allRecipesResponse,
  singleRecipeResponse,
  recipeCommentResponse,
};

const server = makeTestingServer({ recipesData });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("recipes thunk actions tests", () => {
  const mockStore = configureStore([thunk]);

  test("fetches all recipes from the api and dispatches the result", async () => {
    const expectedActions = [
      {
        type: RecipesTypes.FETCH_RECIPES_REQUEST,
      },
      {
        type: RecipesTypes.FETCH_RECIPES_SUCCESS,
        payload: {
          byID: recipesData.allRecipesResponse.recipesByID,
          ids: recipesData.allRecipesResponse.recipesIDS,
        },
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchRecipes());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetches a single recipe from the api and dispatches the result", async () => {
    const expectedActions = [
      {
        type: RecipesTypes.FETCH_RECIPE_REQUEST,
      },
      {
        type: RecipesTypes.FETCH_RECIPE_SUCCESS,
        payload: recipesData.singleRecipeResponse.data,
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchRecipe("recipe_1"));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("creates a new comment and dispatches the result", async () => {
    const comment = recipesData.recipeCommentResponse;

    const expectedActions = [
      {
        type: RecipesTypes.ADD_LOCAL_RECIPE_COMMENT,
        payload: {
          recipeID: "test_comment_recipe_id",
          comment,
        },
      },
    ];

    // getInitialReduxStoreUserState => need it to access the user token inside the thunk
    const store = mockStore(getInitialReduxStoreUserState());
    await store.dispatch(addRecipeComment("test_comment_recipe_id", comment));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
