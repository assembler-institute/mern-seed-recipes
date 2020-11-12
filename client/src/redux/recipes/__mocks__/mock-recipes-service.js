import { rest } from "msw";
import { setupServer } from "msw/node";

/**
 * Set up testing server agnostic from our fetching strategy (axios, fetch, got, etc...)
 *
 * */

const path = "http://localhost:4000";

const makeTestingServer = ({ testData }) =>
  setupServer(
    rest.get(`http://localhost:4000/recipes`, (req, res, ctx) => {
      return res(
        ctx.json({
          data: testData.allRecipesResponse.data,
        }),
        ctx.status(200),
      );
    }),

    rest.get(`${path}/recipes/:recipeID`, (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            data: testData.singleRecipeResponse.data,
          },
        }),
        ctx.status(200),
      );
    }),

    rest.post(`${path}/recipes/:recipeID/comment`, (req, res, ctx) => {
      return res(
        ctx.json({
          data: testData.recipeCommentResponse,
        }),
        ctx.status(200),
      );
    }),
  );

export default makeTestingServer;
