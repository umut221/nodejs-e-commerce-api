const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");
chai.use(chaiHttp);

const apiUrl = "/api/v1/users";

let token;
describe("Users", () => {
    before("GET TOKEN",done => {
        chai.request(server).post(`/api/v1/auth/login`).send({email:"umutcanbozkurt120@gmail.com", password:"1234"}).end((err,res) => {
            token = res.body.token;
            done();
        });
    })
    it("GET users", done => {
        chai.request(server).get(`${apiUrl}/getAll`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET get by id", done => {
        chai.request(server).get(`${apiUrl}/getbyid/63f918600fb7444e752fccf7`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET get count", done => {
        chai.request(server).get(`${apiUrl}/getcount`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("DELETE delete by id", done => {
        chai.request(server).get(`${apiUrl}/delete/:id`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });
})