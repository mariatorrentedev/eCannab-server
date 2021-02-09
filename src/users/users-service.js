const knex = require("knex");
const bcrypt = require("bcryptjs");

const UsersService = {
  hasUserWithEmail(knex, email) {
    return (
      knex("users")
        .where({ email })
        .first()
        // converting to a boolean
        .then((user) => !!user)
    );
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((rows) => rows[0]);
  },
  //bcrypt to hash the password.
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  getAllUsers(knex) {
    return knex("users").select("*");
  },
};

module.exports = UsersService;
