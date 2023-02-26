const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");
chai.use(chaiHttp);

const apiUrl = "/api/v1/orders";

let token;
describe("Orders", () => {
    before("GET TOKEN",done => {
        chai.request(server).post(`/api/v1/auth/login`).send({email:"umutcanbozkurt120@gmail.com", password:"1234"}).end((err,res) => {
            token = res.body.token;
            done();
        });
    })
    it("GET orders", done => {
        
        chai.request(server).get(`${apiUrl}/getAll`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET get by id", done => {
        chai.request(server).get(`${apiUrl}/getbyid/63f2854029951245a6b77f89`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    
    it("POST create order", done => {
        chai.request(server).post(`${apiUrl}/create`).end((err, res) => {
            done();
        });
    });

    it("PUT create order", done => {
        chai.request(server).put(`${apiUrl}/update/:id`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });

    it("DELETE create order", done => {
        chai.request(server).delete(`${apiUrl}/delete/:id`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });
    it("GET total sales", done => {
        chai.request(server).get(`${apiUrl}/getTotalSales`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });
    it("GET count", done => {
        chai.request(server).get(`${apiUrl}/getcount`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });
    it("GET user orders", done => {
        chai.request(server).get(`${apiUrl}/userOrders/:userId`).set({ "Authorization": `Bearer ${token}`}).end((err, res) => {
            done();
        });
    });

})