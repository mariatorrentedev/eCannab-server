require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./Users/users-router");
const authRouter = require("./auth/auth-router");
const sitesRouter = require("./sites/sites-router");
const resourcesRouter = require("./resources/resources-router");
const productsRouter = require("./products/products-router");
const customersRouter = require("./customers/customers-router");
const authRouterCustomer = require("./auth/auth-router-c");
const siteResourcesRouter = require("./site_resources/site_resources-router");
const ordersRouter = require("./orders/orders-router");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

const app = express();
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the ecannab-server!");
});
// Users
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Sites
app.use("/api/s", sitesRouter);

//Products
app.use("/api/products", productsRouter);

//Resources
app.use("/api/resources", resourcesRouter);

//Site Resources
app.use("/api/site_resources", siteResourcesRouter);

//Customers
app.use("/api/customers", customersRouter);
app.use("/api/authcustomer", authRouterCustomer);

//Orders
app.use("/api/orders", ordersRouter);

// Error Handler
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error("error");
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
