const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_NAME, DB_TEST_NAME } = process.env;

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

/**
 * Given an error object, produce an error object to facilitate error handling
 * through the application.
 *
 * @param {object} error - the database error.
 * @returns {object} Error object with an 'ok' property (boolean).
 */
const databaseErrorHandler = (error) => {
  const errorObject = { ok: false, error };
  // validation error
  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.keys(error.errors).map(
      (key) => `Validation Error: ${key}.`
    );
    errorObject.errorMessage = errorMessages;
    // duplicate email
  } else if (err.code === 11000) {
    errorObject.errorMessage = `The email ${this.email} already exists.`;
  }
  return errorObject;
};

module.exports = { connectDB, disconnectDB, databaseErrorHandler };
