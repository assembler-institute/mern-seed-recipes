import React from "react";
import { Switch, Route } from "react-router-dom";

import ROUTES from "./utils/routes";

import HomeContainer from "./redux/containers/pages/HomeContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import SignupContainer from "./redux/containers/pages/SignupContainer";
import RecipeContainer from "./redux/containers/pages/RecipeContainer";

function App() {
  return (
    <Switch>
      <Route path={ROUTES.LOGIN}>
        <LoginContainer />
      </Route>
      <Route path={ROUTES.SIGNUP}>
        <SignupContainer />
      </Route>
      <Route path={ROUTES.RECIPE}>
        <RecipeContainer />
      </Route>
      <Route path={ROUTES.HOME} exact>
        <HomeContainer />
      </Route>
    </Switch>
  );
}

export default App;
