import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import {
  fetchRecipes,
  fetchRecipe,
  addRecipeComment,
} from "../recipes-actions";
import RecipesTypes from "../recipes-types";

import {
  getFetchRecipesJSONResponse,
  getInitialReduxStoreUserState,
  getFetchSingleRecipeJSONResponse,
  getNewRecipeTestComment,
} from "../../../utils/tests";

describe("recipes thunk actions tests", () => {
  beforeEach(() => {
    // Clear previously set mocks so they do not bleed into other mocks
    fetch.resetMocks();
  });

  const mockStore = configureStore([thunk]);

  test("fetches all recipes from the api and dispatches the result", async () => {
    const testData = getFetchRecipesJSONResponse();

    fetch.mockResponseOnce(JSON.stringify(testData.apiResponse), {
      status: 200,
    });

    const expectedActions = [
      {
        type: RecipesTypes.FETCH_RECIPES_REQUEST,
      },
      {
        type: RecipesTypes.FETCH_RECIPES_SUCCESS,
        payload: {
          byID: testData.recipesByID,
          ids: testData.recipesIDS,
        },
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchRecipes());

    expect(fetch.mock.calls[0][0]).toMatch(/\/recipes/);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetches a single recipe from the api and dispatches the result", async () => {
    const testData = getFetchSingleRecipeJSONResponse("recipe_1");

    fetch.mockResponseOnce(JSON.stringify(testData), {
      status: 200,
    });

    const expectedActions = [
      {
        type: RecipesTypes.FETCH_RECIPE_REQUEST,
      },
      {
        type: RecipesTypes.FETCH_RECIPE_SUCCESS,
        payload: testData.data,
      },
    ];

    const store = mockStore();
    await store.dispatch(fetchRecipe("recipe_1"));

    expect(fetch.mock.calls[0][0]).toMatch(/\/recipes\/recipe_1/);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("creates a new comment and dispatches the result", async () => {
    const testComment = getNewRecipeTestComment();

    fetch.mockResponseOnce(
      JSON.stringify({
        data: testComment,
        error: null,
      }),
      {
        status: 201,
      },
    );

    const expectedActions = [
      {
        type: RecipesTypes.ADD_LOCAL_RECIPE_COMMENT,
        payload: {
          recipeID: "test_comment_recipe_id",
          comment: testComment,
        },
      },
    ];

    // getInitialReduxStoreUserState => need it to access the user token inside the thunk
    const store = mockStore(getInitialReduxStoreUserState());
    await store.dispatch(
      addRecipeComment("test_comment_recipe_id", testComment.body),
    );

    expect(fetch.mock.calls[0][0]).toMatch(/\/recipes\/test_comment_recipe_id/);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
