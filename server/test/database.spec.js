const assert = require("chai").assert;
const expect = require("chai").expect;
const { createNewUser } = require("../models/user-model");

describe("User model", () => {
  const testUser = createNewUser({
    email: "test@test123.com",
    companyName: "testCompanyINC",
    password: "test12345",
  });

  it("user instance should be typeof object", () => {
    assert.isObject(testUser);
  });

  it("user instance should have an _id property", () => {
    assert.property(testUser, "_id");
  });

  it("user instance should have an email, companyName and password", () => {
    assert.property(testUser, "email");
    assert.property(testUser, "companyName");
    assert.property(testUser, "password");
  });

  it("if email is missing will return error message", () => {
    const failedUser = createNewUser({
      companyName: "test",
      password: "test12345",
    });
    assert.isString(failedUser);
    assert.include(failedUser, "email");
  });

  it("if companyName is missing will return error message", () => {
    const failedUser = createNewUser({
      email: "test@test.com",
      password: "test12345",
    });
    assert.isString(failedUser);
    assert.include(failedUser, "companyName");
  });

  it("if password is missing will return error message", () => {
    const failedUser = createNewUser({
      email: "test@test.com",
      companyName: "test",
    });
    assert.isString(failedUser);
    assert.include(failedUser, "password");
  });
});
