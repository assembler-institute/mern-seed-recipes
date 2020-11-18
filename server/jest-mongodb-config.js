module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "4.4.1", // https://www.mongodb.com/try/download/community
      skipMD5: true,
    },
    autoStart: false,
  },
};
