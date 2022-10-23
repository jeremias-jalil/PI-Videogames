/* eslint-disable import/no-extraneous-dependencies */
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pi_Videogam, conn } = require("../../src/db.js");

const agent = session(app);
chai.use(chaiHttp);
const url = "http://localhost:3001";
const videogame = {
  name: "Super Mario Bros",
  description: "Description",
};

describe("Insert a Pi_Videogam: ", () => {
  it("should insert a Pi_Videogam", (done) => {
    chai
      .request(url)
      .post("/videogames")
      .send(videogame)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("get all Pi_Videogam: ", () => {
  it("should get a 100 api Videogames and 1 db videogame", (done) => {
    chai
      .request(url)
      .get("/videogames")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).equal(101);
        done();
      });
  });
});

describe("search a Pi_Videogam: ", () => {
  it("should get a search Pi_Videogam", (done) => {
    chai
      .request(url)
      .get("/videogames/?name=Mario")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body[0].name).equal("Super Mario Bros");
        done();
      });
  });
});
