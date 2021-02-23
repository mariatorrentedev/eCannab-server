require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const { makeUsersArr } = require("./fixtures");

describe("/api/users endpoint", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  describe("GET /api/users returns 200 and user information", () => {
    const testUserId = 1;
    const expected = {
      id: 1,
      email: "demo@demo.com",
      password: "Demo1234!",
    };
    return supertest(app).get(`/api/users/${testUserId}`).expect(200, expected);
  });

  describe("POST api/users Endpoint", () => {
    const reqFields = ["password", "email"];

    describe("api/users validation", () => {
      const testUsers = makeUsersArr();
      reqFields.forEach((field) => {
        const userBody = testUsers[0];

        it(`responds with 400 required error when ${field} is missing`, () => {
          delete userBody[field];

          return supertest(app)
            .post("/api/users")
            .send(userBody)
            .expect(400, {
              error: `Missing ${field}`,
            });
        });
      });
      it.skip(`responds with 400 'Password must be longer than 8 characters' when password less than 8 characters`, () => {
        let shortPass = (testUsers.password = "short");

        return supertest(app).post("/api/users").send(shortPass).expect(400);
      });
    });

    "when valid credentials, creates new user in users table, then responds 201 and JWT auth token using secret",
      () => {
        const testUsers = makeUsersArr();

        const expectedToken = jwt.sign({ userid: 2 }, process.env.JWT_SECRET, {
          subject: testUsers[0].email,
          algorithm: "HS256",
        });

        return supertest(app)
          .post("/api/users")
          .send(testUsers)
          .expect(201)
          .then((res) => {
            expect(res.body.authToken).to.eql(expectedToken);
          })
          .then(() => {
            return supertest(app)
              .post("/api/users")
              .send(testUsers)
              .expect(200, {
                authToken: expectedToken,
              });
          });
      };
  });
});
