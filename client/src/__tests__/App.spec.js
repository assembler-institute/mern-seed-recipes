import React from "react";
import App from "../App";
import { renderWithReduxAndRouter } from "../utils/tests";

import { rest } from "msw";
import { setupServer } from "msw/node";

describe("App behaviour", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const apiUrl = "https://localhost:4000";

  const server = setupServer(
    rest.get(`${apiUrl}/recipes`, (req, res, ctx) => {
      return res(ctx.json(usersMockResponse));
    }),
  );

  it("should be defined", () => {
    expect(App).toBeDefined();
  });

  it("should ", () => {
    const { debug } = renderWithReduxAndRouter(<App />);
    debug();
  });
});
