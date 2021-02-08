/*require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeTastingsArr } = require("./tastings.fixtures");
const { makeUsersArr } = require("./users.fixtures");

describe("Tasting endpoints", () => {
  let db;
  let authToken;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE TABLE users, tastings RESTART IDENTITY CASCADE")
  );
  beforeEach("register and login", () => {
    let user = { email: "testuser@test.com", password: "P@ssword1234" };
    return supertest(app)
      .post("/api/users")
      .send(user)
      .then((res) => {
        return supertest(app)
          .post("/api/auth/login")
          .send(user)
          .then((res2) => {
            authToken = res2.body.authToken;
          });
      });
  });

  after("disconnect from db", () => db.destroy());

  afterEach("cleanup", () => db("tastings").truncate());


  describe("GET /api/tastings", () => {
    context(`Given there are tastings in the db`, () => {
      const testTastings = makeTastingsArr();
      const testUsers = makeUsersArr();
      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });
      beforeEach("insert tastings", () => {
        return db.into("tastings").insert(testTastings);
      });
      it("responds with 200 and all of the tastings", () => {
        return supertest(app)
          .get("/api/tastings")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body.length > 0);
            expect(res.body[0].winename === testTastings[0].winename);
          });
      });
    });
  });
  
  describe("POST/api/tastings", () => {
    const testUsers = makeUsersArr();
    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });
    it("creates a tasting and responds with 201 and the new tasting", () => {
      const newTasting = makeTastingsArr();
      return supertest(app)
        .post("/api/tastings")
        .set("Authorization", `Bearer ${authToken}`)
        .send(newTasting[0])
        .expect(201)
        .then((res) => {
          expect(res.body.winename).to.equal(newTasting[0].winename);
          supertest(app)
            .get(`/tastings/${res.body.id}`)
            .then((newRes) => {
              expect(newRes.body.winename).to.equal(newTasting[0].winename);
            });
        });
    });
  });


  describe("DELETE /api/tastings/:id", () => {
    context(`Given no tastings`, () => {
      it(`responds with 404`, () => {
        const tastingId = 123456;
        return supertest(app)
          .delete(`/api/tastings/${tastingId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(404, { error: { message: `tasting doesn't exist` } });
      });
    });

    context("Given there are tastings in the db", () => {
      const testUsers = makeUsersArr();
      const testTastings = makeTastingsArr();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });
      beforeEach("insert tastings", () => {
        return db.into("tastings").insert(testTastings);
      });

      it("responds with 204 and deletes the tasting", () => {
        const idToDelete = 2;
        const expectedTastings = testTastings.filter(
          (tasting) => tasting.id !== idToDelete
        );
        return supertest(app)
          .delete(`/api/tastings/${idToDelete}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(204)
          .then((res) => {
            supertest(app)
              .get(`/api/tastings/`)
              .set("Authorization", `Bearer ${authToken}`)
              .expect(expectedTastings);
          });
      });
    });
  });


  describe(`PUT /api/tastings/:id`, () => {
    context(`Given there is a tasting at id in the database`, () => {
      const testTastings = makeTastingsArr();
      const testUsers = makeUsersArr();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });

      beforeEach("insert tastings", () => {
        return db.into("tastings").insert(testTastings);
      });

      it(`responds with 200 and updates the tasting`, () => {
        const idToUpdate = 2;
        const updateTasting = {
          winename: "Yacochuya",
        };
        const expectedTasting = {
          ...testTastings[idToUpdate - 1],
          ...updateTasting,
        };
        return supertest(app)
          .put(`/api/tastings/${idToUpdate}`)
          .set("Authorization", `Bearer ${authToken}`)
          .send(updateTasting)
          .expect(200)
          .then((res) =>
            supertest(app)
              .get(`/api/tastings/${idToUpdate}`)
              .set("Authorization", `Bearer ${authToken}`)
              .send(expectedTasting)
          );
      });
    });
  });
});
*/
