import { createSelector } from "reselect";

export const selectRecipes = (state) => state.recipes.ids;
export const selectRecipe = (state, recipeID) => state.recipes.byID[recipeID];
export const selectRecipesState = (state) => state.recipes;

export const recipesSelector = createSelector(
  [selectRecipes],
  (recipesIDS) => recipesIDS,
);

export const recipesStateSelector = createSelector(
  [selectRecipesState],
  (recipesState) => recipesState,
);

export const makeRecipeSelector = () =>
  createSelector([selectRecipe], (recipe) => recipe);
