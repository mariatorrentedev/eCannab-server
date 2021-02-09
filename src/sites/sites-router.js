/*const express = require("express");
const TastingsService = require("./tastings-service");
const { requireAuth } = require("../middleware/jwt-auth");

const tastingsRouter = express.Router();
const bodyParser = express.json();

tastingsRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    console.log("called", req.user.id);
    TastingsService.getAllTastings(req.app.get("db"), req.user.id)
      .then((tastings) => res.json(tastings))
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    if (!req.body.winename) {
      res.status(400).json({ error: "Wine Name required" });
    }
    const newtasting = req.body;
    newtasting.userid = req.user.id;

    TastingsService.insertTasting(req.app.get("db"), newtasting)
      .then((tasting) => {
        res.status(201).location(`/tastings/${tasting.id}`).json(tasting);
      })
      .catch(next);
  });

tastingsRouter
  .route("/:id")
  .all(requireAuth, (req, res, next) => {
    cid = parseInt(req.params.id);
    TastingsService.getById(req.app.get("db"), cid, req.user.id)
      .then((tastings) => {
        if (!tastings) {
          return res.status(404).json({
            error: { message: `tasting doesn't exist` },
          });
        }
        res.tastings = tastings;
        next();
      })
      .catch(next);
  })

  .delete(requireAuth, (req, res, next) => {
    TastingsService.deleteTasting(req.app.get("db"), cid, req.user.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, bodyParser, (req, res, next) => {
    const updateTasting = req.body;
    TastingsService.updateTasting(
      req.app.get("db"),
      cid,
      updateTasting,
      req.user.id
    )
      .then(() => {
        res.status(200).json((res.updateTasting = updateTasting));
      })
      .catch(next);
  });

module.exports = tastingsRouter; */
