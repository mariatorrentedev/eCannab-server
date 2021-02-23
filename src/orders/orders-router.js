const express = require("express");
const OrdersService = require("./orders-service");
const { requireAuth } = require("../middleware/jwt-auth-customer");

const ordersRouter = express.Router();
const bodyParser = express.json();

ordersRouter
  .route("/")
  .get((req, res, next) => {
    OrdersService.getSiteOrders(req.app.get("db"))
      .then((orders) => res.json(orders))
      .catch(next);
  })
  .post((req, res, next) => {
    if (!req.body.total_paid) {
      res.status(400).json({ error: "Total is required" });
    }
    const neworder = req.body;

    OrdersService.insertOrder(req.app.get("db"), neworder)
      .then((order) => {
        res.status(201).location(`/orders/${order.id}`).json(order);
      })
      .catch(next);
  });
ordersRouter
  .route("/:site_id")
  .all((req, res, next) => {
    OrdersService.getSiteOrders(req.app.get("db"), parseInt(req.params.site_id))
      .then((site) => {
        if (!site) {
          return res.status(404).json({
            error: {
              message: `site doesn't exist`,
            },
          });
        }
        res.site = site;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(res.orders.rows);
  });

ordersRouter
  .route("/:id")
  .all(requireAuth, (req, res, next) => {
    cid = parseInt(req.params.id);
    OrdersService.getById(req.app.get("db"), cid, req.customer.id)
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({
            error: { message: `order doesn't exist` },
          });
        }
        res.orders = orders;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(req.order);
  })
  .delete(requireAuth, (req, res, next) => {
    OrdersService.deleteOrder(req.app.get("db"), cid, req.customer.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, bodyParser, (req, res, next) => {
    const updateOrder = req.body;
    OrdersService.updateOrder(
      req.app.get("db"),
      cid,
      updateOrder,
      req.customer.id
    )
      .then(() => {
        res.status(200).json((res.updateOrder = updateOrder));
      })
      .catch(next);
  });

module.exports = ordersRouter;
