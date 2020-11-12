import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import {
  fetchRecipes,
  fetchRecipe,
  addRecipeComment,
} from "../recipes-actions";
import RecipesTypes from "../recipes-types";

import { getInitialReduxStoreUserState } from "../../../utils/tests";

import allRecipesResponse from "../__mocks__/all-recipes.json";
import singleRecipeResponse from "../__mocks__/single-recipe.json";
import recipeCommentResponse from "../__mocks__/recipe-comments.json";

import makeTestingServer from "../__mocks__/mock-recipes-service";

const testData = {
  allRecipesResponse,
  singleRecipeResponse,
  recipeCommentResponse,
};

const server = makeTestingServer({ testData });

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
          byID: testData.allRecipesResponse.recipesByID,
          ids: testData.allRecipesResponse.recipesIDS,
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
        payload: testData.singleRecipeResponse,
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchRecipe("recipe_1"));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("creates a new comment and dispatches the result", async () => {
    const comment = testData.recipeCommentResponse;

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
