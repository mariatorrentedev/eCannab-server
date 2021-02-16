const express = require("express");
const ResourcesService = require("./site_resources-service");
const { requireAuth } = require("../middleware/jwt-auth");

const siteResourcesRouter = express.Router();
const bodyParser = express.json();

siteResourcesRouter.route("/").get(requireAuth, (req, res, next) => {
  ResourcesService.getAllResources(req.app.get("db"))
    .then((resources) => res.json(resources))
    .catch(next);
});

module.exports = siteResourcesRouter;
