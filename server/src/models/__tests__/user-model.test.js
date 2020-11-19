const config = require("../../utils/tests/config");
const User = require("../user-model");
const { getUserModelTestUser } = require("../../utils/tests/seedTestDB");

beforeAll(async () => await config.connect());
afterAll(async () => await config.disconnect());

describe("user model", () => {
  const testUser = getUserModelTestUser();

  beforeEach(async () => await config.deleteUsersByEmail(testUser.user.email));

  it("can create a new user model", async () => {
    const user = await User.create({
      ...testUser.user,
      password: testUser.unhashedPassword,
    });

    expect(user._id).toBeDefined();
    expect(user.password).not.toBe(testUser.unhashedPassword);
    expect(user.name).toBe(testUser.user.name);
    expect(user.lastname).toBe(testUser.user.lastname);
    expect(user.email).toBe(testUser.user.email);
  });
});
