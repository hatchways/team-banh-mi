const mongoose = require("mongoose");
const {
  databaseErrorHandler,
  encryptPasswordWithSalt,
} = require("../utils/database");

/**
 * User Schema.
 * @property {string} email - email of the user.
 * @property {string[]} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  companyName: {
    type: [String],
    required: [true, "Company name is required"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must be at least 6 characters"],
  },
  favoriteMentions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "mention" }],
  },
  platforms: {
    type: [String],
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
  schema.add({ isActive: Boolean });
  schema.pre("save", function (next) {
    this.isActive = true;
    next();
  });
}

/** Applying the softDeletion plugin to the userSchema */
userSchema.plugin(softDeletionPlugin);

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
userSchema.statics.findByEmail = async function (email) {
  const [user] = await this.find({ email });
  return user;
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
      if (err) return databaseErrorHandler(err);
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
      if (err) return databaseErrorHandler(err);
      return res;
    }
  );
};

/**
 * Get the company name of the current user's insance.
 *
 * @returns {string[]} - an array with the current user's company names.
 * @method
 */
userSchema.methods.getCompanyName = async function () {
  const result = await User.find({ email: this.email }).select(
    "companyName -_id"
  );
  return result[0].companyName;
};

/**
 * Given a company name, add the current user's instance company to it's
 * company name array.
 *
 * @param {string} companyName - the new company name.
 * @returns {boolean} false if operation failed, else true.
 * @method
 */
userSchema.methods.addCompanyName = async function (companyName) {
  const { ok } = await User.updateOne(
    { email: this.email },
    { $push: { companyName } }
  );
  if (!ok) return false;
  return true;
};

/**
 * Given a company name, delete the current user's instance company from it's
 * company name array.
 *
 * @param {string} companyName - the new company name.
 * @returns {boolean} false if operation failed, else true.
 * @method
 */
userSchema.methods.deleteCompanyName = async function (companyName) {
  const { ok } = await User.updateOne(
    { email: this.email },
    { $pull: { companyName } }
  );
  if (!ok) return false;
  return true;
};

/**
 * Given a password, hash the given password and update the current user
 * instance to be the hashed password.
 *
 * @param {string} password - the new password.
 * @returns {boolean|mongoose.Query} false if operation failed.
 * @method
 */
userSchema.methods.resetPassword = async function (password) {
  try {
    const hashedPass = await encryptPasswordWithSalt(password);
    return User.updateOne(
      { email: this.email },
      { password: hashedPass },
      (error, res) => {
        if (error) return databaseErrorHandler(error);
        return res;
      }
    );
  } catch (error) {
    return databaseErrorHandler(error);
  }
};

/**
 * Encrypt the password of the user's instance.
 *
 * @returns {object} Confirmation object with 'ok' property.
 * @private
 * @method
 */
userSchema.methods._encryptPassword = async function () {
  try {
    this.password = await encryptPasswordWithSalt(this.password);
    return { ok: true };
  } catch (error) {
    return databaseErrorHandler(error);
  }
};

/**
 * Validate the user instance using it's model's schema, encrypt it's password
 * and store it into the database. This operation will fail if either operation
 * fails.
 *
 * @returns {object} Response object with a valid token.
 * @private
 * @method
 */
userSchema.methods.registerUser = async function () {
  try {
    await this._encryptPassword();
    await this.save();
    const userData = {
      email: this.email,
      id: this._id,
      companyName: this.companyName,
      platforms: this.platforms,
      favoriteMentions: this.favoriteMentions,
    };
    return { save: true, userData };
  } catch (err) {
    return { err: databaseErrorHandler(err) };
  }
};

/**
 * Produce an array of all the favorite mentions of a user.
 *
 * @returns {Object[]} an array of mentions.
 */
userSchema.methods.getFavoriteMentions = async function () {
  try {
    const user = await User.findById(this._id).populate("favoriteMentions");
    return user.favoriteMentions;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Given the id of a mention, add the mention to the userSchema's
 * favoriteMentions array.
 *
 * @param {ObjectId} id
 * @returns {boolean} produce true if the operation was successful, else false.
 */
userSchema.methods.addFavoriteMentions = async function (id) {
  try {
    const { ok } = await User.updateOne(
      { email: this.email },
      { $push: { favoriteMentions: id } }
    );
    if (!ok) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Given the id of a mention, remove the mention from the userSchema's
 * favoriteMentions array.
 *
 * @param {ObjectId} id
 * @returns {boolean} produce true if the operation was successful, else false.
 */
userSchema.methods.deleteFavoriteMentions = async function (id) {
  try {
    const { ok } = await User.updateOne(
      { email: this.email },
      { $pull: { favoriteMentions: id } }
    );
    if (!ok) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Given a platform, add the platform to the array of active platforms for the
 * user.
 *
 * @param {string} platform
 * @returns {boolean} produce true if the operation was successful, else false.
 */
userSchema.methods.addPlatform = async function (platform) {
  try {
    const { ok } = await User.updateOne(
      { email: this.email },
      { $push: { platforms: platform } }
    );
    if (!ok) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Given a platform, delete the platform from the array of active platforms for
 * the user.
 *
 * @param {string} platform
 * @returns {boolean} produce true if the operation was successful, else false.
 */
userSchema.methods.deletePlatform = async function (platform) {
  try {
    const { ok } = await User.updateOne(
      { email: this.email },
      { $pull: { platforms: platform } }
    );
    if (!ok) return false;
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * User Model.
 * @constructor
 * @property {string} email - email of the user.
 * @property {string} companyName - company name of the user.
 * @property {string} password - password of the user.
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
