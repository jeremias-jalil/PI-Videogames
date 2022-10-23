const { Pi_Videogam, Pi_Genre, Pi_Platform, conn } = require("../../src/db.js");
const { expect, assert } = require("chai");
const app = require("../../src/app.js");
const session = require("supertest-session");

const agent = session(app);

describe("Pi_Videogam model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pi_Videogam.sync({ force: true }));
    describe("Data", () => {
      it("should throw an error if name is null", (done) => {
        Pi_Videogam.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pi_Videogam.create({ name: "Super Mario Bros" });
      });

      it("should create a id type UUID", () => {
        return Pi_Videogam.create({
          name: "Super Mario Bros",
          description: "Super Mario Bros",
        }).then((videogame) => {
          expect(videogame.id).to.be.a("string");
          expect(videogame.id).to.have.lengthOf(36);
          assert.match(
            videogame.id,
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
          );
        });
      });
    });
  });
});

describe("Pi_Genre model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pi_Genre.sync({ force: true }));
    describe("Input data", () => {
      it("should throw an error if name is null", (done) => {
        Pi_Genre.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should throw an error if id is null", () => {
        Pi_Genre.create({ name: "Super Mario Bros" })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name an valid id", () => {
        return Pi_Genre.create({ name: "Super Mario Bros", id: 1 }).then(
          (genre) => {
            expect(genre.name).to.equal("Super Mario Bros");
          }
        );
      });
    });
  });
});

describe("Pi_Platform model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pi_Platform.sync({ force: true }));
    describe("Input data", () => {
      it("should throw an error if name is null", (done) => {
        Pi_Platform.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should throw an error if id is null", () => {
        Pi_Platform.create({ name: "Super Mario Bros" })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid name an valid id", () => {
        return Pi_Platform.create({ name: "Super Mario Bros", id: 1 }).then(
          (platform) => {
            expect(platform.name).to.equal("Super Mario Bros");
          }
        );
      });
    });
  });
});
