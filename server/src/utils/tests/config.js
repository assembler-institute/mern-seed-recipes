const mongoose = require("mongoose");
require("dotenv").config();

const config = require("../../config")[process.env.NODE_ENV || "test"];

async function connect() {
  /**
   * Connection ready state
   * 0 = disconnected
   * 1 = connected
   * 2 = connecting
   * 3 = disconnecting
   */
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(config.db.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .catch((error) => {
        if (error) {
          throw new Error(error);
        }
      });
  }
}

/**
 * Loops through all the collections in the mongoose connection and clears them
 */
async function clearCollections() {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
}

/**
 * Loops through all the collections in the mongoose connection and drops them
 */
async function dropCollections() {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.drop();
  }
}

/**
 * Clears the user collection
 */
async function clearUserCollection() {
  await mongoose.connection.db.collection("users").deleteMany();
}

/**
 * Drops the user collection
 */
async function dropUserCollection() {
  await mongoose.connection.db.collection("users").drop();
}

/**
 * Delete users by email
 */
async function deleteUsersByEmail(emails) {
  await mongoose.connection.db.collection("users").deleteMany({
    email: {
      $in: emails,
    },
  });
}

/**
 * Clears the recipes collection
 */
async function clearRecipesCollection() {
  await mongoose.connection.db.collection("recipes").deleteMany();
}

/**
 * Drops the recipes collection
 */
async function dropRecipesCollection() {
  await mongoose.connection.db.collection("recipes").drop();
}

/**
 * Disconnect from the mongoose connection
 */
async function disconnect() {
  await mongoose.connection.close();
}

module.exports = {
  connect,
  clearCollections,
  dropCollections,
  clearUserCollection,
  deleteUsersByEmail,
  dropUserCollection,
  clearRecipesCollection,
  dropRecipesCollection,
  disconnect,
};
