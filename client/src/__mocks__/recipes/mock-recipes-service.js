import { rest } from "msw";
import { setupServer } from "msw/node";

/**
 * Set up testing server agnostic from our fetching strategy (axios, fetch, got, etc...)
 *
 * */

const path = "http://localhost:4000";

const makeHandlers = ({ recipesData }) => [
  rest.get(`${path}/recipes`, (_, res, ctx) => {
    return res(
      ctx.json({
        data: recipesData.allRecipesResponse.data,
      }),
      ctx.status(200),
    );
  }),

  rest.get(`${path}/recipes/:recipeID`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: recipesData.singleRecipeResponse.data,
      }),
      ctx.status(200),
    );
  }),

  rest.post(`${path}/recipes/:recipeID/comment`, (_, res, ctx) => {
    return res(
      ctx.json({
        data: recipesData.recipeCommentResponse,
      }),
      ctx.status(200),
    );
  }),
];

const makeTestingServer = (data) => setupServer(...makeHandlers(data));

export default makeTestingServer;

export { makeHandlers };
