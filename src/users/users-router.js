const express = require("express");
const xss = require("xss");
const usersRouter = express.Router();
const UsersService = require("./users-service");
const { requireAuth } = require("../middleware/jwt-auth");

const serializeUser = (user) => {
  return {
    id: user.id,
    email: xss(user.email),
    datecreated: user.datecreated,
  };
};
let knexInstance;

usersRouter
  .route("/api/users")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next();
  })
  .get(requireAuth, (req, res) => {
    res.json(serializeUser(req.user));
  })
  .post((req, res) => {
    const { password, email } = req.body;
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

    UsersService.hasUserWithEmail(knexInstance, email).then((hasUser) => {
      if (hasUser) {
        return res.status(400).json({
          error: `Email already used`,
        });
      }

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          email,
          password: hashedPassword,
        };
        return UsersService.insertUser(knexInstance, newUser).then((user) => {
          res.status(201).json(serializeUser(user));
        });
      });
    });
  });

module.exports = usersRouter;
