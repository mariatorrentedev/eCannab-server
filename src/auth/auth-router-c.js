const express = require("express");
const AuthServiceCustomer = require("./auth-service-c");
const authRouterCustomer = express.Router();

authRouterCustomer
  .route("/login")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next();
  })
  .post((req, res, next) => {
    const { password, email } = req.body;
    const customer = { password, email };
    for (const field of ["email", "password"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing ${field}`,
        });
      }
    }
    AuthServiceCustomer.getCustomerWithEmail(knexInstance, email)
      .then((dbCustomer) => {
        if (!dbCustomer) {
          return res.status(400).json({
            error: "Incorrect email or password",
          });
        }
        AuthServiceCustomer.comparePasswords(password, dbCustomer.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({
                error: "Incorrect email or password",
              });
            }

            const subject = dbCustomer.email;
            const payload = { customer_id: dbCustomer.id };
            res.send({
              authToken: AuthServiceCustomer.createJwt(subject, payload),
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });

module.exports = authRouterCustomer;
