const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBSERVER = new MongoMemoryServer();
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = async () => {
  const URLMock = await DBSERVER.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};

module.exports = { getConnection };