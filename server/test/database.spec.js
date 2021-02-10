const assert = require("chai").assert;
const expect = require("chai").expect;
const path = require("path");
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../database/helpers");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// describe("Database", () => {
//   describe("connectDB", () => {
//     it("should throw an error when the connection fails", async () => {
//       const result = await connectDB("nonExistentDB");
//       assert.isObject(result);
//       assert.property(result, error);
//     });
//     // it("should not throw an error when the connection succeeds", () => {});
//   });
// });
