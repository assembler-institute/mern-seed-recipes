const supertest = require("supertest");
const config = require("../../utils/tests/config");

const app = require("../../server");

const request = supertest(app);

beforeAll(async () => await config.connect());

const testUser = {
  name: "Test User Name",
  lastname: "Test User LastName",
  email: "testemail@mail.com",
  password: "testpassword",
};

afterAll(async () => {
  await config.deleteUsersByEmail([testUser.email]);
  await config.disconnect();
});

describe("User route", () => {
  test("Can sign up a new user", async () => {
    const res = await request.post("/user/sign-up").send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.data.user._id).toBeDefined();
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.body.data.user.password).not.toBeDefined();
    expect(res.body.error).toBeNull();
  });

  test("Can login", async () => {
    const testUser = {
      name: "Test User Name",
      lastname: "Test User LastName",
      email: "testemail@mail.com",
      password: "testpassword",
    };

    const loginRes = await request.post("/user/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.data.user.email).toBe(testUser.email);
    expect(loginRes.body.data.token).toEqual(expect.any(String));
    expect(loginRes.body.error).toBeNull();
  });
});
