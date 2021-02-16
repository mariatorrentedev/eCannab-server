const express = require("express");
const xss = require("xss");
const customersRouter = express.Router();
const CustomersService = require("./customers-service");
const { requireAuth } = require("../middleware/jwt-auth-customer");

const serializeCustomer = (customer) => {
  return {
    id: customer.id,
    email: xss(customer.email),
    password: customer.password,
    datecreated: customer.datecreated,
  };
};
let knexInstance;

customersRouter
  .route("")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next();
  })
  .get(requireAuth, (req, res) => {
    res.json(serializeCustomer(req.customer));
  })
  .post((req, res) => {
    const { site_id, password, email } = req.body;
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

    for (const field of ["email", "password"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field}`,
        });
      }
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: `Password must be 8 or more characters`,
      });
    }

    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return res.status(400).json({
        error: `Password must contain one uppercase character, one lowercase character, one special character and one number`,
      });
    }

    CustomersService.hasCustomerWithEmail(knexInstance, email)
      .then((hasCustomer) => {
        if (hasCustomer) {
          return res.status(400).json({
            error: `Email already used`,
          });
        }

        return CustomersService.hashPassword(password)
          .then((hashedPassword) => {
            const newCustomer = {
              site_id,
              email,
              password: hashedPassword,
            };
            return CustomersService.insertCustomer(
              knexInstance,
              newCustomer
            ).then((customer) => {
              res.status(201).json(serializeCustomer(customer));
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });

module.exports = customersRouter;
