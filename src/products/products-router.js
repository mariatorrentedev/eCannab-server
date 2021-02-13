const express = require("express");
const ProductsService = require("./products-service");
const { requireAuth } = require("../middleware/jwt-auth");

const productsRouter = express.Router();
const bodyParser = express.json();

productsRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    ProductsService.getAllProducts(req.app.get("db"), req.user.id)
      .then((products) => res.json(products))
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    if (!req.body.title) {
      res.status(400).json({ error: "Title is required" });
    }
    const newproduct = req.body;

    ProductsService.insertProduct(req.app.get("db"), newproduct)
      .then((product) => {
        res.status(201).location(`/products/${product.id}`).json(product);
      })
      .catch(next);
  });

productsRouter
  .route("/:id")
  .all(requireAuth, (req, res, next) => {
    cid = parseInt(req.params.id);
    ProductsService.getById(req.app.get("db"), cid)
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: { message: `Product doesn't exist` },
          });
        }
        req.product = products[0];
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(req.product);
  })
  .delete((req, res, next) => {
    ProductsService.deleteProduct(req.app.get("db"), cid)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(bodyParser, (req, res, next) => {
    const updateProduct = req.body;
    ProductsService.updateProduct(req.app.get("db"), cid, updateProduct)
      .then(() => {
        res.status(200).json((res.updateProduct = updateProduct));
      })
      .catch(next);
  });

module.exports = productsRouter;
