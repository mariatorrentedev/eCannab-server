require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeResourcesArr, makeUsersArr } = require("./fixtures");

describe("Resources endpoints", () => {
  let db;
  let authToken;
  let id;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE TABLE users, resources RESTART IDENTITY CASCADE")
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

  //after("disconnect from db", () => db.destroy());
  //afterEach("cleanup", () => db("products").truncate());
  //afterEach("cleanup", () => db("resources").truncate());
  //afterEach("cleanup", () => db("site_resources").truncate());
  //afterEach("cleanup", () => db("resources").truncate());
  //afterEach("cleanup", () => db("users").truncate());

  /* GET */
  describe("GET /api/resources", () => {
    context(`Given there are resources in the db`, () => {
      const testresources = makeResourcesArr();
      const testUsers = makeUsersArr();
      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });
      beforeEach("get user id", () => {
        return db
          .select("id")
          .from("users")
          .first()
          .then((res) => {
            id = res.id;
          });
      });
      beforeEach("insert resources", () => {
        testresources.forEach((resource) => {
          resource.user_id = id;
        });

        return db.into("resources").insert(testresources);
      });

      it("responds with 200 and all of the resources", () => {
        return supertest(app)
          .get("/api/resources")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body.length > 0);
            expect(res.body[0].name === testresources[0].name);
          });
      });
    });
  });
  /* POST */
  describe("POST/api/resources", () => {
    const testUsers = makeUsersArr();
    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });
    beforeEach("get user id", () => {
      return db
        .select("id")
        .from("users")
        .first()
        .then((res) => {
          id = res.id;
        });
    });
    it("creates a resource and responds with 201 and the new resource", () => {
      const newResource = makeResourcesArr();
      return supertest(app)
        .post("/api/resources")
        .set("Authorization", `Bearer ${authToken}`)
        .send(newResource[0])
        .expect(201)
        .then((res) => {
          expect(res.body.name).to.equal(newResource[0].name);
          supertest(app)
            .get(`/resources/${res.body.id}`)
            .then((newRes) => {
              expect(newRes.body.name).to.equal(newResource[0].name);
            });
        });
    });
  });
});
