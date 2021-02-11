const mongoose = require("mongoose");
const { createNewUserObject, saveDataToUserModel } = require("./userData");

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

/**
 * User Schema.
 * @property {string} email - email of the user.
 * @property {string} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Plugin for the userSchema. Adds the 'isActive' property (boolean) with a
 * default value of 'true'.
 *
 * @param {object} schema - represents the schema to which the changes will be
 * applied.
 */
function softDeletionPlugin(schema) {
  schema.path("isActive", Boolean).default(true);
}

/** Applying the softDeletion plugin to the userSchema */
userSchema.plugin(softDeletionPlugin);

/**
 * User Model.
 * @constructor
 * @property {string} email - email of the user.
 * @property {string} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const User = mongoose.model("User", userSchema);

/**
 * Given a user object, validate the user using it's model's schema, produce
 * the new user's instance of a user and upload it to the database. If user
 * object is missing either email, companyName or password, will return a usage
 * string.
 *
 * @param {object} user - user object.
 * @property {string} email - the user's email.
 * @property {string} companyName - the user's company name.
 * @property {string} password - the user's password.
 * @returns {object|string}
 */
userSchema.statics.createAndUpload = async function ({
  email,
  companyName,
  password,
}) {
  try {
    await User.validate({ email, companyName }, ["email", "companyName"]);
    const newUser = createNewUserObject({ email, companyName, password });
    return saveDataToUserModel(newUser);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.keys(err.errors).map(
        (key) => `Validation Error: ${key} needs to be present.`
      );
      return errorMessages.join("\n");
    }
  }
};

/**
 * Produce an array of active users (not soft-deleted).
 *
 * @returns {object[]} an array of users.
 * @static
 */
userSchema.statics.findAll = function () {
  return this.find({ isActive: true });
};

/**
 * Given an email, produce the user with the given email.
 *
 * @param {string} email - the email of the user to be found.
 * @returns {object} - the user with the given email.
 * @static
 */
userSchema.statics.findByEmail = function (email) {
  return this.find({ email });
};

/**
 * Given a company name, produce an array of users with the give company name.
 *
 * @param {string} companyName - the company name of the users to be found.
 * @returns {object[]} - an array of users with the given company name.
 * @static
 */
userSchema.statics.findByCompanyName = function (companyName) {
  return this.find({ companyName });
};

/**
 * Produce an array of all the users that have been (soft) deleted.
 *
 * @returns {object[]} - an array of users that have been (soft) deleted.
 * @static
 */
userSchema.statics.findDeleted = function () {
  return this.find({ isActive: false });
};

/**
 * Produce true if the current user instance has been (soft) deleted. Else
 * produce false.
 *
 * @returns {boolean} 'true' if the current the current user has been (soft)
 * deleted. Else false.
 * @method
 */
userSchema.methods.isDeleted = function () {
  return !this.isActive;
};

/**
 * Soft delete the current user instance.
 *
 * @returns {boolean|mongoose.Query} false if operation failed.
 * @method
 */
userSchema.methods.softDelete = function () {
  return User.updateOne(
    { email: this.email },
    { isActive: false },
    (err, res) => {
      if (error) return false;
      return res;
    }
  );
};

/**
 * Recover the current user's instance from soft deletion.
 *
 * @returns {boolean|mongoose.Query} false if operation failed.
 * @method
 */
userSchema.methods.softRecover = function () {
  return User.updateOne(
    { email: this.email },
    { isActive: true },
    (err, res) => {
      if (err) return false;
      return res;
    }
  );
};

/**
 * Get the company name of the current user's insance.
 *
 * @returns {mongoose.Query} - the company name of the current user's instance.
 * @method
 */
userSchema.methods.getCompanyName = function () {
  return User.find({ email: this.email }).select("companyName -_id");
};

/**
 * Given a company name, set the current user's instance company to be the
 * given company name.
 *
 * @param {string} companyName - the new company name.
 * @returns {boolean|mongoose.Query} false if operation failed.
 * @method
 */
userSchema.methods.setCompanyName = function (companyName) {
  return User.updateOne({ email: this.email }, { companyName }, (err, res) => {
    if (error) return false;
    return res;
  });
};

/**
 * Given a company name, set the current user's instance company to be the
 * given company name.
 *
 * @param {string} password - the new password.
 * @returns {boolean|mongoose.Query} false if operation failed.
 * @method
 */
userSchema.methods.resetPassword = function (password) {
  return User.updateOne({ email: this.email }, { password }, (error, res) => {
    if (error) return false;
    return res;
  });
};

module.exports = { userSchema, User };
