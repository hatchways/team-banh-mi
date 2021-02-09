const mongoose = require('mongoose');

const { DB_USER, DB_PASS, DB_NAME } = process.env;

/**
 * Opens a connection to the MongoDB Atlas instance used in this project, using
 * the individual login credentials created in the root environment file.
 *
 * @returns {Promise|object} If connection is successful, returns Promise that
 * resolves to 'this'. If connection fails, returns object with a message and
 * the error.
 */
const connectDB = () => {
  const URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.sd3mb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  return mongoose.connect(URI, options, err => {
    if (err) {
      return {
        msg: 'Database connection failed.',
        error: err,
      };
    }
  });
};

/**
 * Closes the default mongoose connection.
 *
 * @returns {Promise}
 */
const disconnectDB = () => mongoose.connection.close();

module.exports = { connectDB, disconnectDB };
