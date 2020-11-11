import RecipesTypes from "./recipes-types";

import { normalizeRecipes } from "../../schema/recipes-schema";

export const fetchRecipesRequest = () => ({
  type: RecipesTypes.FETCH_RECIPES_REQUEST,
});

export const fetchRecipesError = (errorMessage) => ({
  type: RecipesTypes.FETCH_RECIPES_ERROR,
  payload: errorMessage,
});

export const fetchRecipesSuccess = ({ byID, ids }) => ({
  type: RecipesTypes.FETCH_RECIPES_SUCCESS,
  payload: {
    byID: byID,
    ids: ids,
  },
});

export const fetchRecipeRequest = () => ({
  type: RecipesTypes.FETCH_RECIPE_REQUEST,
});

export const fetchRecipeError = (errorMessage) => ({
  type: RecipesTypes.FETCH_RECIPE_ERROR,
  payload: errorMessage,
});

export const fetchRecipeSuccess = (recipe) => ({
  type: RecipesTypes.FETCH_RECIPE_SUCCESS,
  payload: recipe,
});

export const recipeUpdating = () => ({
  type: RecipesTypes.RECIPE_UPDATING,
});

export const recipeUpdatingError = (errorMessage) => ({
  type: RecipesTypes.RECIPE_UPDATING_ERROR,
  payload: errorMessage,
});

export const addLocalRecipeComment = (recipeID, comment) => ({
  type: RecipesTypes.ADD_LOCAL_RECIPE_COMMENT,
  payload: {
    recipeID: recipeID,
    comment: comment,
  },
});

export function fetchRecipes() {
  return async function fetchRecipesThunk(dispatch) {
    dispatch(fetchRecipesRequest());

    const res = await fetch("http://localhost:4000/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => dispatch(fetchRecipesError(error.message)));

    const recipesJson = await res
      .json()
      .catch((error) => dispatch(fetchRecipesError(error.message)));

    if (res.ok) {
      const normalizedRecipes = normalizeRecipes(recipesJson.data);

      dispatch(
        fetchRecipesSuccess({
          byID: normalizedRecipes.entities.recipes,
          ids: normalizedRecipes.result,
        }),
      );
    }
  };
}

export function fetchRecipe(recipeID) {
  return async function fetchRecipeThunk(dispatch) {
    dispatch(fetchRecipeRequest());

    const res = await fetch(`http://localhost:4000/recipes/${recipeID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      dispatch(fetchRecipeError(error.message));
    });

    const recipeJson = await res.json();

    if (res.ok) {
      dispatch(fetchRecipeSuccess(recipeJson.data));
    } else {
      dispatch(fetchRecipeError(recipeJson.error));
    }
  };
}

export function addRecipeComment(recipeID, commentBody) {
  return async function addRecipeCommentThunk(dispatch, getState) {
    const token = getState().user.currentUser.token;

    if (token) {
      const res = await fetch(
        `http://localhost:4000/recipes/${recipeID}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            commentBody: commentBody,
          }),
        },
      ).catch((error) => dispatch(recipeUpdatingError(error.message)));

      const resJson = await res
        .json()
        .catch((error) => dispatch(recipeUpdatingError(error.message)));

      if (res.ok) {
        try {
          dispatch(
            addLocalRecipeComment(recipeID, {
              _id: resJson.data._id,
              body: resJson.data.body,
              recipe: resJson.data.recipe,
              author: {
                _id: resJson.data.author._id,
                name: resJson.data.author.name,
                lastname: resJson.data.author.lastname,
              },
            }),
          );
        } catch (error) {
          dispatch(recipeUpdatingError(error.message));
        }
      } else {
        dispatch(recipeUpdatingError(resJson.error));
      }
    } else {
      dispatch(recipeUpdatingError("Missing auth token"));
    }
  };
}
