require("dotenv").config();
const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeProductsArr, makeUsersArr } = require("./fixtures");

describe("Products endpoints", () => {
  let db;
  let authToken;
  let user_id;
  let siteid;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE TABLE users, products RESTART IDENTITY CASCADE")
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
  afterEach("cleanup", () => db("products").truncate());
  afterEach("cleanup", () => db("sites").truncate());
  afterEach("cleanup", () => db("site_resources").truncate());
  afterEach("cleanup", () => db("resources").truncate());
  afterEach("cleanup", () => db("users").truncate());

  /* GET */
  describe("GET /api/products", () => {
    context(`Given there are products in the db`, () => {
      const testProducts = makeProductsArr();
      const testUsers = makeUsersArr();
      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });
      beforeEach("get user id", (done) => {
        console.log(user_id);
        return db
          .select("id")
          .from("users")
          .first()
          .then((res) => {
            user_id = res.id;
            done();
          })
          .catch(done);
      });
      beforeEach("get site id", (done) => {
        return db
          .select("id")
          .from("sites")
          .where({ user_id })
          .then((res) => {
            siteid = res.id;
            done();
          })
          .catch(done);
      });
      beforeEach("insert site_id", () => {
        console.log(siteid);
        testProducts.forEach((product) => {
          product.site_id = siteid;
        });

        return db.into("products").insert(testProducts);
      });

      it.skip("responds with 200 and all of the products", () => {
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200)
          .then((res) => {
            expect(res.body.length > 0);
            expect(res.body[0].title === testProducts[0].title);
          });
      });
    });
  });
  /* POST */
  describe("POST/api/products", () => {
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
    beforeEach("get site id", () => {
      return db
        .select("id")
        .from("sites")
        .where({ id })
        .then((res) => {
          siteid = res.id;
        });
    });

    it.skip("creates a product and responds with 201 and the new product", () => {
      const newProduct = makeProductsArr();
      return supertest(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${authToken}`)
        .send(newProduct[0])
        .expect(201)
        .then((res) => {
          expect(res.body.brand).to.equal(newProduct[0].title);
          supertest(app)
            .get(`/s/${res.body.id}`)
            .then((newRes) => {
              expect(newRes.body.title).to.equal(newProduct[0].title);
            });
        });
    });
  });

  /* DELETE */
  describe("DELETE /api/products/:id", () => {
    context(`Given no products`, () => {
      it(`responds with 404`, () => {
        const product_id = 123456;
        return supertest(app)
          .delete(`/api/products/${product_id}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(404, { error: { message: `Product doesn't exist` } });
      });
    });

    context("Given there are products in the db", () => {
      const testUsers = makeUsersArr();
      const testProducts = makeProductsArr();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });
      beforeEach("get user id", () => {
        return db
          .select("id")
          .from("users")
          .first()
          .then((res) => {
            user_id = res.id;
          });
      });
      beforeEach("get site id", () => {
        return db
          .select("id")
          .from("sites")
          .where({ user_id })
          .then((res) => {
            siteid = res.id;
          });
      });
      beforeEach("insert products", () => {
        testProducts.forEach((product) => {
          product.site_id = siteid;
        });

        return db.into("products").insert(testProducts);
      });

      it.skip("responds with 204 and deletes the product", () => {
        const idToDelete = 2;
        const expectedProduct = testProducts.filter(
          (product) => product.id !== idToDelete
        );
        return supertest(app)
          .delete(`/api/products/${idToDelete}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(204)
          .then((res) => {
            supertest(app)
              .get(`/api/products/`)
              .set("Authorization", `Bearer ${authToken}`)
              .expect(expectedProduct);
          });
      });
    });
  });

  /* PUT */
  describe(`PUT /api/products/:id`, () => {
    context(`Given there is a product at id in the database`, () => {
      const testProducts = makeProductsArr();
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
      beforeEach("get site id", () => {
        return db
          .select("id")
          .from("sites")
          .where({ user_id })
          .then((res) => {
            siteid = res.id;
          });
      });
      beforeEach("insert products", () => {
        testProducts.forEach((product) => {
          product.user_id = id;
          product.site_id = siteid;
        });

        return db.into("products").insert(testProducts);
      });

      it.skip(`responds with 200 and updates the site`, () => {
        const idToUpdate = 2;
        const updateProduct = {
          title: "Spero",
        };
        const expectedProduct = {
          ...testProducts[idToUpdate - 1],
          ...updateProduct,
        };
        return supertest(app)
          .put(`/api/products/${idToUpdate}`)
          .set("Authorization", `Bearer ${authToken}`)
          .send(updateProduct)
          .expect(200)
          .then((res) =>
            supertest(app)
              .get(`/api/s/${idToUpdate}`)
              .set("Authorization", `Bearer ${authToken}`)
              .send(expectedProduct)
          );
      });
    });
  });
});
