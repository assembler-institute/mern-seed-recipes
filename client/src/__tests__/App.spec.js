import React from "react";
import App from "../App";
import { renderWithReduxAndRouter } from "../utils/tests";
import { waitFor } from "@testing-library/react";

import makeTestingServer from "../__mocks__/make-testing-server";

import allRecipesResponse from "../__mocks__/recipes/all-recipes.json";
import singleRecipeResponse from "../__mocks__/recipes/single-recipe.json";
import recipeCommentResponse from "../__mocks__/recipes/recipe-comments.json";

const testUser = {
  name: "test_user_name",
  lastname: "test_user_lastname",
  email: "test_user_email",
  password: "test_user_password",
};

const testPayload = {
  name: "test_user_name",
  lastname: "test_user_lastname",
  email: "test_user_email",
  token: "test_user_token",
};

const userData = {
  testUser,
  testPayload,
};

/**
 * Based on the AAA principle,
 * These test will describe the end user intentions with the app.
 * Because of this, they are mostly integration tests
 *
 * More: https://kentcdodds.com/blog/write-tests
 */

describe("App behaviour", () => {
  const server = makeTestingServer({
    userData,
    recipesData: {
      allRecipesResponse,
      singleRecipeResponse,
      recipeCommentResponse,
    },
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should be defined", () => {
    expect(App).toBeDefined();
  });

  describe("Application [Navbar]", () => {
    it(`should contain the right content`, () => {
      const { getByText } = renderWithReduxAndRouter(<App />);
      expect(
        getByText("Assembler School Recipes 🍜", { exact: false }),
      ).toBeInTheDocument();

      expect(getByText("Registrar", { exact: false })).toBeInTheDocument();

      expect(getByText("Login", { exact: false })).toBeInTheDocument();
    });
  });

  describe("Application [Hero]", () => {
    it(`should contain the right content`, () => {
      const { getByText } = renderWithReduxAndRouter(<App />);
      expect(
        getByText("Descubre nuestras mejores recetas", { exact: false }),
      ).toBeInTheDocument();

      expect(
        getByText("Nuestros expertos cocineros", { exact: false }),
      ).toBeInTheDocument();
    });
  });

  describe("Application [Recipes]", () => {
    it(`should contain the right content when loading`, () => {
      const { getByText } = renderWithReduxAndRouter(<App />);

      expect(
        getByText("Cargando recetas...", { exact: false }),
      ).toBeInTheDocument();
    });

    it(`should contain the right content once its loaded`, async () => {
      const { queryByText, queryAllByText } = renderWithReduxAndRouter(<App />);

      await waitFor(() =>
        expect(queryByText("recipe-3-name")).toBeInTheDocument(),
      );
      const items = await queryAllByText(/Tiempo Estimado/);

      expect(items).toHaveLength(3);
    });
  });

  describe("Application [Footer]", () => {
    it(`should contain the right content`, () => {
      const { getByText } = renderWithReduxAndRouter(<App />);
      expect(
        getByText("Assembler School MERN Starter 🌱 2020", { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
