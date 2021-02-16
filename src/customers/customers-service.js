const knex = require("knex");
const bcrypt = require("bcryptjs");

const CustomersService = {
  hasCustomerWithEmail(knex, email) {
    return knex("customers")
      .where({ email })
      .first()
      .then((customer) => !!customer);
  },
  insertCustomer(knex, newCustomer) {
    return knex
      .insert(newCustomer)
      .into("customers")
      .returning("*")
      .then((rows) => rows[0]);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  getAllCustomers(knex) {
    return knex("customers").select("*");
  },
};

module.exports = CustomersService;
