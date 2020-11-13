import { setupServer } from "msw/node";

import { makeHandlers as makeUserServiceHandlers } from "./user/mock-user-service";
import { makeHandlers as makeRecipesServiceHandlers } from "./recipes/mock-recipes-service";

const makeTestingServer = (data) =>
  setupServer(
    ...makeUserServiceHandlers(data),
    ...makeRecipesServiceHandlers(data),
  );

export default makeTestingServer;
