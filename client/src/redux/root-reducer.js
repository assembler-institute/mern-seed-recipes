import { combineReducers } from "redux";

import UserReducer from "./user/user-reducer";
import RecipesReducer from "./recipes/recipes-reducer";

const rootReducer = combineReducers({
  user: UserReducer,
  recipes: RecipesReducer,
});

export default rootReducer;
