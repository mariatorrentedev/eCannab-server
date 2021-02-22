const express = require("express");
const SiteResourcesService = require("./site_resources-service");
const { requireAuth } = require("../middleware/jwt-auth");

const siteResourcesRouter = express.Router();
const bodyParser = express.json();

siteResourcesRouter.route("/").post((req, res, next) => {
  const { siteid, resource } = req.body;
  console.log(siteid, resource);

  SiteResourcesService.insertResourcesIntoSite(
    req.app.get("db"),
    siteid,
    resource
  )
    .then((resourceOutput) => {
      res.status(201).json(resourceOutput);
    })
    .catch(next);
});

siteResourcesRouter
  .route("/:site_id")
  .all((req, res, next) => {
    SiteResourcesService.getSiteResources(
      req.app.get("db"),
      parseInt(req.params.site_id)
    )
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
    res.json(res.site.rows);
  });
module.exports = siteResourcesRouter;
