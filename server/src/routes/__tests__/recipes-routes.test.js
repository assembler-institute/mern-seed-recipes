const supertest = require("supertest");
const config = require("../../utils/tests/config");

const app = require("../../server");

const setupTestDB = require("../../utils/tests/seedTestDB");

const request = supertest(app);

beforeAll(async () => {
  await config.connect();
  await setupTestDB.seedTestDB();
});

afterAll(async () => {
  await config.dropCollections();
  await config.disconnect();
});

describe("Public recipe routes", () => {
  test("Can fetch all recipes", async () => {
    const res = await request.get("/recipes");

    expect(res.status).toBe(200);
    expect(res.body.error).toBeNull();
    expect(res.body.data[0]._id).toEqual(expect.any(String));
  });

  test("Can fetch a single recipe", async () => {
    const TEST_RECIPE = await setupTestDB.getRecipeWithComments();

    const res = await request.get(`/recipes/${TEST_RECIPE._id}`);

    expect(res.status).toBe(200);
    expect(res.body.error).toBeNull();
    expect(res.body.data._id).toEqual(expect.any(String));
    expect(res.body.data.author._id).toEqual(expect.any(String));
    expect(res.body.data.comments).toEqual(expect.any(Array));
  });
});

describe("Authenticated recipe routes", () => {
  let bearerToken = "";
  let testRecipe;

  beforeAll(async () => {
    testRecipe = await setupTestDB.getRecipeWithComments();

    const AUTHENTICATED_TEST_USER = setupTestDB.getAuthenticatedTestUser();

    const user = {
      email: AUTHENTICATED_TEST_USER.user.email,
      password: AUTHENTICATED_TEST_USER.unhashedPassword,
    };

    const loginRes = await request.post("/user/login").send(user);

    bearerToken = loginRes.body.data.token;
  });

  test("Can add comments to a recipe", async () => {
    const res = await request
      .post(`/recipes/${testRecipe._id}/comment`)
      .send({
        commentBody: "Test comment body.",
      })
      .set("Authorization", `Bearer ${bearerToken}`);

    expect(res.status).toBe(201);
    expect(res.body.data._id).toEqual(expect.any(String));
    expect(res.body.data.author._id).toEqual(expect.any(String));
    expect(res.body.data.recipe).toEqual(expect.any(String));
    expect(res.body.error).toBeNull();
  });

  test("Can’t add comments to a recipe without a comment body", async () => {
    const res = await request
      .post(`/recipes/${testRecipe._id}/comment`)
      .set("Authorization", `Bearer ${bearerToken}`);

    expect(res.status).toBe(400);
    expect(res.body.data).toBeNull();
    expect(res.body.error).toMatch(/missing/i);
  });

  test("Can’t add comments to a recipe without a token", async () => {
    const res = await request.post(`/recipes/${testRecipe._id}/comment`);

    expect(res.status).toBe(401);
  });

  test("Can remove comments from a recipe", async () => {
    const res = await request
      .delete(`/recipes/${testRecipe._id}/${testRecipe.comments[0]}`)
      .set("Authorization", `Bearer ${bearerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBe("Ok");
    expect(res.body.error).toBeNull();
  });

  test("Can’t remove comments from a recipe without a token", async () => {
    const res = await request.delete(
      `/recipes/${testRecipe._id}/${testRecipe.comments[0]}`,
    );

    expect(res.status).toBe(401);
  });
});
