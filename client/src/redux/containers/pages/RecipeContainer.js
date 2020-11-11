import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  makeRecipeSelector,
  recipesStateSelector,
} from "../../recipes/recipes-selectors";

import { addRecipeComment, fetchRecipe } from "../../recipes/recipes-actions";
import { currentUserStateSelector } from "../../user/user-selectors";
import Recipe from "../../../pages/Recipe/Recipe";

const makeMapStateToProps = () => {
  const recipeSelector = makeRecipeSelector();

  return (state, ownProps) => {
    const recipeID = ownProps.match.params.recipeID;

    return {
      recipe: recipeSelector(state, recipeID),
      recipeState: recipesStateSelector(state),
      currentUserState: currentUserStateSelector(state),
    };
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRecipe: (recipeID) => dispatch(fetchRecipe(recipeID)),
  addRecipeComment: (recipeID, commentBody) =>
    dispatch(addRecipeComment(recipeID, commentBody)),
});

export default withRouter(
  connect(makeMapStateToProps, mapDispatchToProps)(Recipe),
);
