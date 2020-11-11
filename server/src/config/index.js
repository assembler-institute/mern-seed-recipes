require("dotenv").config();

module.exports = {
  development: {
    port: 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    db: {
      url: process.env.MONGO_DB_URL_DEVELOPMENT,
    },
  },
  test: {
    port: 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    db: {
      url: process.env.MONGO_DB_URL_TEST,
    },
  },
  production: {
    port: 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    db: {
      url: process.env.MONGO_DB_URL_PRODUCTION,
    },
  },
};
