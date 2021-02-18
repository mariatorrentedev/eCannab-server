const express = require("express");
const SiteResourceService = require("./site_resources-service");
const { requireAuth } = require("../middleware/jwt-auth");

const siteResourcesRouter = express.Router();
const bodyParser = express.json();

siteResourcesRouter
  .route("/:site_id")
  .get((req, res, next) => {
    SiteResourceService.getSiteResources(
      req.app.get("db"),
      parseInt(req.params.site_id)
    )
      .then((site) => {
        console.log(site);
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
