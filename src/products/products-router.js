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
    newproduct;

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
    ProductsService.getById(req.app.get("db"), cid, req.site.id)
      .then((products) => {
        if (!products) {
          return res.status(404).json({
            error: { message: `Product doesn't exist` },
          });
        }
        res.products = products;
        next();
      })
      .catch(next);
  })

  .delete(requireAuth, (req, res, next) => {
    ProductsService.deleteSite(req.app.get("db"), cid, req.site.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, bodyParser, (req, res, next) => {
    const updateProduct = req.body;
    ProductsService.updateProduct(
      req.app.get("db"),
      cid,
      updateProduct,
      req.site.id
    )
      .then(() => {
        res.status(200).json((res.updateProduct = updateProduct));
      })
      .catch(next);
  });

module.exports = productsRouter;
