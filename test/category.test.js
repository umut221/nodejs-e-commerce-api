const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");
chai.use(chaiHttp);

const apiUrl = "/api/v1/categories";

let token;

describe("Categories", () => {
  before("GET TOKEN", (done) => {
    chai
      .request(server)
      .post(`/api/v1/auth/login`)
      .send({ email: "umutcanbozkurt120@gmail.com", password: "1234" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  it("GET categories", (done) => {
    chai
      .request(server)
      .get(`${apiUrl}/getAll`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.property("success").eql(true);
        done();
      });
  });

  it("POST create category", (done) => {
    const categoryName = "Test"
    chai
      .request(server)
      .post(`${apiUrl}/create`)
      .send({
        name: categoryName,
      })
      .set({ "Authorization": `Bearer ${token}`})
      .end((err, res) => {


        done();
      });
  });
          

  it("GET get by id", (done) => {
    chai
      .request(server)
      .get(`${apiUrl}/getById/${categoryId}`)
      .end((err, res) => {
        done();
      });
  });

  it("PUT categories", (done) => {
    chai
      .request(server)
      .put(`${apiUrl}/update/:id`)
      .end((err, res) => {
        done();
      });
  });

  it("DELETE delete by id", (done) => {
    chai
      .request(server)
      .delete(`${apiUrl}/delete/:id`)
      .end((err, res) => {
        done();
      });
  });
});
