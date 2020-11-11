import { connect } from "react-redux";

import {
  recipesSelector,
  recipesStateSelector,
} from "../../recipes/recipes-selectors";

import { fetchRecipes } from "../../recipes/recipes-actions";

import Home from "../../../pages/Home/Home";

const mapStateToProps = (state) => ({
  recipes: recipesSelector(state),
  recipesState: recipesStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
