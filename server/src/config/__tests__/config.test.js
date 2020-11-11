const config = require("../");

test("App development config is set-up", () => {
  expect(config.development.port).toEqual(expect.any(Number));
  expect(config.development.JWT_SECRET).toEqual(expect.any(String));
  expect(config.development.BCRYPT_SALT_ROUNDS).toEqual(expect.any(Number));
  expect(config.development.db.url).toEqual(expect.any(String));
});

test("App production config is set-up", () => {
  expect(config.production.port).toEqual(expect.any(Number));
  expect(config.production.JWT_SECRET).toEqual(expect.any(String));
  expect(config.production.BCRYPT_SALT_ROUNDS).toEqual(expect.any(Number));
  expect(config.production.db.url).toEqual(expect.any(String));
});

test("App test config is set-up", () => {
  expect(config.test.port).toEqual(expect.any(Number));
  expect(config.test.JWT_SECRET).toEqual(expect.any(String));
  expect(config.test.BCRYPT_SALT_ROUNDS).toEqual(expect.any(Number));
  expect(config.test.db.url).toEqual(expect.any(String));
});
