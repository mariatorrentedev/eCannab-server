require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeSitesArr } = require("./sites.fixtures");
const { makeUsersArr } = require("./users.fixtures");

describe("Sites endpoints", () => {
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
    db.raw("TRUNCATE TABLE users, sites RESTART IDENTITY CASCADE")
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
  //afterEach("cleanup", () => db("sites").truncate());
  //afterEach("cleanup", () => db("site_resources").truncate());
  //afterEach("cleanup", () => db("resources").truncate());
  //afterEach("cleanup", () => db("users").truncate());

  /* GET */
  describe("GET /api/s", () => {
    context(`Given there are sites in the db`, () => {
      const testSites = makeSitesArr();
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
      beforeEach("insert sites", () => {
        testSites.forEach((site) => {
          site.user_id = id;
        });

        return db.into("sites").insert(testSites);
      });

      it("responds with 200 and all of the sites", () => {
        return supertest(app)
          .get("/api/s")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body.length > 0);
            expect(res.body[0].brand === testSites[0].brand);
          });
      });
    });
  });
  /* POST */
  describe("POST/api/s", () => {
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
    it("creates a site and responds with 201 and the new site", () => {
      const newSite = makeSitesArr();
      return supertest(app)
        .post("/api/s")
        .set("Authorization", `Bearer ${authToken}`)
        .send(newSite[0])
        .expect(201)
        .then((res) => {
          expect(res.body.brand).to.equal(newSite[0].brand);
          supertest(app)
            .get(`/s/${res.body.id}`)
            .then((newRes) => {
              expect(newRes.body.brand).to.equal(newSite[0].brand);
            });
        });
    });
  });

  /* DELETE */
  describe("DELETE /api/s/:id", () => {
    context(`Given no sites`, () => {
      it(`responds with 404`, () => {
        const site_id = 123456;
        return supertest(app)
          .delete(`/api/s/${site_id}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(404, { error: { message: `site doesn't exist` } });
      });
    });

    context("Given there are sites in the db", () => {
      const testUsers = makeUsersArr();
      const testSites = makeSitesArr();

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
      beforeEach("insert sites", () => {
        testSites.forEach((site) => {
          site.user_id = id;
        });

        return db.into("sites").insert(testSites);
      });

      it("responds with 204 and deletes the site", () => {
        const idToDelete = 2;
        const expectedSite = testSites.filter((site) => site.id !== idToDelete);
        return supertest(app)
          .delete(`/api/s/${idToDelete}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(204)
          .then((res) => {
            supertest(app)
              .get(`/api/s/`)
              .set("Authorization", `Bearer ${authToken}`)
              .expect(expectedSite);
          });
      });
    });
  });

  /* PUT */
  describe(`PUT /api/s/:id`, () => {
    context(`Given there is a site at id in the database`, () => {
      const testSites = makeSitesArr();
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
      beforeEach("insert sites", () => {
        testSites.forEach((site) => {
          site.user_id = id;
        });

        return db.into("sites").insert(testSites);
      });

      it(`responds with 200 and updates the site`, () => {
        const idToUpdate = 2;
        const updateSite = {
          brand: "Spero",
        };
        const expectedSite = {
          ...testSites[idToUpdate - 1],
          ...updateSite,
        };
        return supertest(app)
          .put(`/api/s/${idToUpdate}`)
          .set("Authorization", `Bearer ${authToken}`)
          .send(updateSite)
          .expect(200)
          .then((res) =>
            supertest(app)
              .get(`/api/s/${idToUpdate}`)
              .set("Authorization", `Bearer ${authToken}`)
              .send(expectedSite)
          );
      });
    });
  });
});
