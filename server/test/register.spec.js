const rewire = require('rewire');
const chai = require('chai');
const should = chai.should();
const server = require("../bin/www");

const tag = rewire('../routes/register');

describe('App path test', function(){
    describe("Test get /welcome",function(){
        it("It Should return 200 status and  welcomeMessag with Step 1 (completed)",function(){
            chai.request(server)
                .get("/welcome")
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res).to.be.json;
                    res.body.should.be.deep.equal({ welcomeMessage: "Step 1 (completed)" });
                });
        });
    });

    describe("Test get /register",function(){
        it("It Should return 200 status and message with register page displayed successfully!",function(){
            chai.request(server)
                .get("/register")
                .end((err,res) =>{
                    res.should.have.status(200);
                    expect(res).to.be.json;
                    res.body.should.be.deep.equal({ message: "register page displayed successfully!" });
                });
        });
    });

    describe("Test post /register",function(){
        it("It Should return 400 status and error with comapny name parameter is required.",function(){
            chai.request(server)
                .post("/register")
                .body({"email": "abc@gmail.com", "companyName": "", "password": "1234567"})
                .end((err,res) =>{
                    res.should.have.status(400);
                    expect(res).to.be.json;
                    res.body.should.be.deep.equal({"error": "Company name parameter is required"});
                });
        });
    });

    
    describe("Test post /register",function(){
        it("It Should return 400 status and error with Password parameter must be greater than 6",function(){
            chai.request(server)
                .post("/register")
                .body({"email": "abc@gmail.com", "companyName": "abc", "password": "1234"})
                .end((err,res) =>{
                    res.should.have.status(400);
                    expect(res).to.be.json;
                    res.body.should.be.deep.equal({"error": "Password parameter must be greater than 6"});
                });
        });
    });

    describe("Test post /register",function(){
        it("It Should return 400 status and error with Email parameter is required.",function(){
            chai.request(server)
                .post("/register")
                .body({"email": "abc@gmail.com", "companyName": "", "password": "1234567"})
                .end((err,res) =>{
                    res.should.have.status(400);
                    expect(res).to.be.json;
                    res.body.should.be.deep.equal({"error": "Email parameter is required"});
                });
        });
    });






});


const hasValidProperty = tag.__get__('hasValidProperty');

describe('test hasValidProperty',function(){
    describe('check hasValidProperty has valid property or not',function(){
        it('It should check valid has proprty in object if yes return true',function(){
            hasValidProperty({"valid":true}).should.deep.equal(true);
        });

        it('It should check valid has property in object if no return false',function(){
            hasValidProperty({ "error": "direction parameter is invalid" }).should.deep.equal(false);
        });
    });
});

const isStringNullOREmptyORUndefined = tag.__get__('isStringNullOREmptyORUndefined');

describe('test isStringNullOREmptyORUndefined',function(){
    describe('check isStringNullOREmptyORUndefined is empty,null or undefined or not',function(){
        it('It should check string is empty or not if yes return true',function(){
            isStringNullOREmptyORUndefined("").should.deep.equal(true);
        });

        it('It should check string is null or not if yes return true',function(){
            isStringNullOREmptyORUndefined(null).should.deep.equal(true);
        });

        it('It should check string is undefined or not if yes return true',function(){
            isStringNullOREmptyORUndefined(undefined).should.deep.equal(true);
        });

        it('It should check string is undefined/empty/null or not if no return false',function(){
            isStringNullOREmptyORUndefined(undefined).should.deep.equal(false);
        });
    });
});

const isPasswordValid = tag.__get__('isPasswordValid');

describe('test isPasswordValid',function(){
    describe('check isPasswordValid valid or not',function(){
        it('It should check the length of the password if password > 6 return true',function(){
            isPasswordValid("1234567").should.deep.equal(true);
        });

        it('It should check the length of the password if password <= 6 return false',function(){
            isPasswordValid("1234").should.deep.equal(false);
        });
    });
});


const validateRequest = tag.__get__('validateRequest');
field = {email:'abc@gmail.com',companyName:'abc',password:'1234567'};
fieldWithMissingEmail = {email:'',companyName:'abc',password:'1234567'};
fieldWithMissingCompanyName = {email:'abc@gmail.com',companyName:'',password:'1234567'};
fieldWithIncorrectPassword = {email:'abc@gmail.com',companyName:'',password:'12345'};

describe('test validateRequest',function(){
    describe('check validateRequest has valid request body or not',function(){
        it('It Should check request body param is valid if yes return valid with true',function(){
            validateRequest(field).should.deep.equal({"valid":true});
        });

        it('It should check validateRequest has valid email param if no return with proper message',function(){
            validateRequest(fieldWithMissingEmail).should.deep.equal({"error": "Email parameter is required"});
        });

        it('It should check validateRequest has valid comapny name param if no return with proper message',function(){
            validateRequest(fieldWithMissingCompanyName).should.deep.equal({"error": "Company name parameter is required"});
        });

        it('It should check validateRequest has valid password param if no return with proper message',function(){
            validateRequest(fieldWithIncorrectPassword).should.deep.equal({"error": "Password parameter must be greater than 6"});
        });
    });
});

