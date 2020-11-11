require("dotenv").config();

const app = require("./server");
const config = require("./config")[process.env.NODE_ENV || "development"];
const connect = require("./db/connect");

const seed = require("./utils/seed");
const { dropCollections } = require("./utils/tests/config");

connect()
  .then(async () => {
    await dropCollections();
    await seed();

    app.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
