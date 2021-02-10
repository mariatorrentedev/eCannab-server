const express = require("express");
const SitesService = require("./sites-service");
const { requireAuth } = require("../middleware/jwt-auth");

const sitesRouter = express.Router();
const bodyParser = express.json();

sitesRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    SitesService.getAllSites(req.app.get("db"), req.user.id)
      .then((sites) => res.json(sites))
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    if (!req.body.brand) {
      res.status(400).json({ error: "Brand is required" });
    }
    const newsite = req.body;
    newsite.userid = req.user.id;

    SitesService.insertSite(req.app.get("db"), newsite)
      .then((site) => {
        res.status(201).location(`/s/${site.id}`).json(site);
      })
      .catch(next);
  });

sitesRouter
  .route("/:id")
  .all(requireAuth, (req, res, next) => {
    cid = parseInt(req.params.id);
    SitesService.getById(req.app.get("db"), cid, req.user.id)
      .then((sites) => {
        if (!sites) {
          return res.status(404).json({
            error: { message: `site doesn't exist` },
          });
        }
        res.sites = sites;
        next();
      })
      .catch(next);
  })

  .delete(requireAuth, (req, res, next) => {
    SitesService.deleteSite(req.app.get("db"), cid, req.user.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, bodyParser, (req, res, next) => {
    const updateSite = req.body;
    SitesService.updateSite(req.app.get("db"), cid, updateSite, req.user.id)
      .then(() => {
        res.status(200).json((res.updateSite = updateSite));
      })
      .catch(next);
  });

module.exports = sitesRouter;
