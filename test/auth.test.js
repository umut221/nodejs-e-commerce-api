const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");

chai.use(chaiHttp);

const apiUrl = "/api/v1/auth";

describe("Auth", () => {
    it("POST Login", done => {
        chai.request(server).post(`${apiUrl}/login`).send({email:"umutcanbozkurt120@gmail.com", password:"1234"}).end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
});


