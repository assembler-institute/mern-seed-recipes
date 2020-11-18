const config = require("../");

const env = process.env.NODE_ENV;

test("App development config is set-up", () => {
  expect(config[env].port).toEqual(expect.any(Number));
  expect(config[env].JWT_SECRET).toEqual(expect.any(String));
  expect(config[env].BCRYPT_SALT_ROUNDS).toEqual(expect.any(Number));
  expect(config[env].db.url).toEqual(expect.any(String));
});
