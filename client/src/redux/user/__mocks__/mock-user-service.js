import { rest } from "msw";
import { setupServer } from "msw/node";

/**
 * Set up testing server agnostic from our fetching strategy (axios, fetch, got, etc...)
 *
 * */

const path = "http://localhost:4000";

const makeTestingServer = ({ testUser, testPayload }) =>
  setupServer(
    rest.post(`${path}/user/sign-up`, (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            user: testUser,
            token: testPayload.token,
          },
        }),
        ctx.status(200),
      );
    }),

    rest.post(`${path}/user/login`, (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            user: testUser,
            token: testPayload.token,
          },
        }),
        ctx.status(200),
      );
    }),

    rest.post(`${path}/user/logout`, (req, res, ctx) => {
      return res(ctx.status(200));
    }),
  );

export default makeTestingServer;
