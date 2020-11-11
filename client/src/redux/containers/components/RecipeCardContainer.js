import { connect } from "react-redux";

import { makeRecipeSelector } from "../../recipes/recipes-selectors";

import RecipeCard from "../../../components/RecipeCard/RecipeCard";

const makeMapStateToPros = () => {
  const recipeSelector = makeRecipeSelector();

  return (state, ownProps) => ({
    recipe: recipeSelector(state, ownProps.recipeID),
  });
};

export default connect(makeMapStateToPros)(RecipeCard);
