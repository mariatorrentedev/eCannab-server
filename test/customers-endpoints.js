require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const { makeCustomersArr } = require("./fixtures");

describe("Customers endpoint", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE TABLE customers RESTART IDENTITY CASCADE")
  );

  describe("GET /api/customers returns 200 and user information", () => {
    const testCustomerId = 1;
    const expected = {
      id: 1,
      email: "demo@demo.com",
      password: "Demo1234!",
    };
    return supertest(app)
      .get(`/api/customers/${testCustomerId}`)
      .expect(200, expected);
  });

  describe("POST api/customers Endpoint", () => {
    const reqFields = ["password", "email"];

    describe("api/customers validation", () => {
      const testCustomers = makeCustomersArr();
      reqFields.forEach((field) => {
        const userBody = testCustomers[0];

        it(`responds with 400 required error when ${field} is missing`, () => {
          delete userBody[field];

          return supertest(app)
            .post("/api/customers")
            .send(userBody)
            .expect(400, {
              error: `Missing ${field}`,
            });
        });
      });
      it(`responds with 400 'Password must be longer than 8 characters' when password less than 8 characters`, () => {
        let shortPass = (testCustomers.password = "short");

        return supertest(app)
          .post("/api/customers")
          .send(shortPass)
          .expect(400);
      });
    });

    it.skip("when valid credentials, creates new user in users table, then responds 201 and JWT auth token using secret", () => {
      const testCustomers = makeCustomersArr();

      const expectedToken = jwt.sign({ userid: 2 }, process.env.JWT_SECRET, {
        subject: testCustomers[0].email,
        algorithm: "HS256",
      });

      return supertest(app)
        .post("/api/customers")
        .send(testCustomers)
        .expect(201)
        .then((res) => {
          expect(res.body.authToken).to.eql(expectedToken);
        })
        .then(() => {
          return supertest(app)
            .post("/api/customers")
            .send(testCustomers)
            .expect(200, {
              authToken: expectedToken,
            });
        });
    });
  });
});
