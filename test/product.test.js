const chai = require('chai');
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");
chai.use(chaiHttp);

const apiUrl = "/api/v1/products";

describe("Products", () => {
    it("GET products", done => {
        chai.request(server).get(`${apiUrl}/getAll`).end((err, res) => {
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET product by id", done => {
        chai.request(server).get(`${apiUrl}/getbyid/63f24056a5f0a65feabf5a31`).end((err, res) => {
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("POST add product", done => {
        chai.request(server).post(`${apiUrl}/create`).end((err, res) => {
            done();
        });
    });
    it("PUT update product", done => {
        chai.request(server).put(`${apiUrl}/update/:id`).end((err, res) =>{
            done();
        });
    });
    it("DELETE product", done => {
        chai.request(server).delete(`${apiUrl}/delete/:id`).end((err, res) =>{
            done();
        });
    });
    it("GET count", done => {
        chai.request(server).get(`${apiUrl}/getCount`).end((err, res) =>{
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET featured", done => {
        chai.request(server).get(`${apiUrl}/getFeatured`).end((err, res) =>{
            res.body.should.be.property("success").eql(true);
            done();
        });
    });
    it("GET get by categories", done => {
        chai.request(server).get(`${apiUrl}/getByCategories/:id`).end((err, res) =>{
            done();
        });
    });
    
});