require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const { makeUsersArr, makeUsersArr2 } = require("./fixtures");

describe("Login User endpoint", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  beforeEach("clean the table", () =>
    db.raw(
      "TRUNCATE TABLE users, sites, resources, products RESTART IDENTITY CASCADE"
    )
  );

  describe("POST api/auth/login", () => {
    const testUsers = makeUsersArr();
    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      const login = {
        email: testUsers[0].email,
        password: testUsers[0].password,
      };

      it(`responds with 400 required error when ${field} is missing`, () => {
        delete login[field];

        return supertest(app)
          .post("/api/auth/login")
          .send(login)
          .expect(400, {
            error: `Missing ${field}`,
          });
      });

      it(`responds with 400 'Invalid email or password' when bad ${field}`, () => {
        login[field] = `invalid-${field}`;

        return supertest(app).post("/api/auth/login").send(login).expect(400, {
          error: "Incorrect email or password",
        });
      });
    });

    it.skip("responds 200 and JWT auth token and valid credentials", () => {
      const testUsers2 = makeUsersArr2();
      const validUser = {
        email: testUsers2[0].email,
        password: testUsers2[0].password,
      };

      const expectedToken = jwt.sign(
        { userId: testUsers2.id },
        process.env.JWT_SECRET,
        {
          subject: testUsers2[0].email,
          algorithm: "HS256",
        }
      );

      return supertest(app)
        .post("/api/auth/login")
        .send(validUser)
        .expect(200, {
          authToken: expectedToken,
        });
    });
  });
});
