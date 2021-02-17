const rewire = require("rewire");
const chai = require("chai");
const should = chai.should();
const server = require("../bin/www");

const tag = rewire("../routes/login");

describe("App path test", function () {
  describe("Test get /login", function () {
    it("It Should return 200 status and message with login page displayed successfully!", function () {
      chai
        .request(server)
        .get("/login")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.json;
          res.body.should.be.deep.equal({
            message: "login page displayed successfully!",
          });
        });
    });
  });
});
