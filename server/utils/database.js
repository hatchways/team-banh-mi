const mongoose = require("mongoose");

// TODO:
// Without lines 9 and 10, line 14 logs are undefined. When lines 9 and
// 10 are uncommented, line 14 logs the correct env variables.
// Suggested solution: add the following config object ({ path:
// path.resove(__direname, "../.env")}) to the require statement at /ping/www:4

// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { DB_USER, DB_PASS, DB_NAME, DB_TEST_NAME } = process.env;

console.log(DB_USER, DB_NAME);

/**
 * Opens a connection to the MongoDB Atlas instance used, using the
 * individual login credentials created in the root environment file.
 *
 * @param {string} [environment=prod] - if 'test', then will connect to the
 * testing database. Else it will connect to the production database.
 * @returns {void}
 */
const connectDB = (environment = "prod") => {
  let dbName = DB_NAME;
  if (environment === "test") dbName = DB_TEST_NAME;
  const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.sd3mb.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const options = { useUnifiedTopology: true, useNewUrlParser: true };
  mongoose.connect(URI, options);
};

/**
 * Closes the default mongoose connection.
 *
 * @returns {Promise}
 */
const disconnectDB = () => mongoose.connection.close();

module.exports = { connectDB, disconnectDB };
