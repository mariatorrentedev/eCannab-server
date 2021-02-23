const express = require("express");
const ResourcesService = require("./resources-service");
const { requireAuth } = require("../middleware/jwt-auth");

const resourcesRouter = express.Router();
const bodyParser = express.json();

resourcesRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    ResourcesService.getAllResources(req.app.get("db"))
      .then((resources) => res.json(resources))
      .catch(next);
  })
  // At a new resource to the eCannab site.
  .post(requireAuth, (req, res, next) => {
    if (!req.body.link) {
      res.status(400).json({ error: "Link is required" });
    }
    const newresource = req.body;
    newresource.user_id = req.user.id;

    ResourcesService.insertResource(req.app.get("db"), newresource)
      .then((resource) => {
        res.status(201).location(`resources/${resource.id}`).json(resource);
      })
      .catch(next);
  });

resourcesRouter.route("/:id").all(requireAuth, (req, res, next) => {
  cid = parseInt(req.params.id);
  ResourcesService.getById(req.app.get("db"), cid, req.user.id)
    .then((resources) => {
      if (!resources) {
        return res.status(404).json({
          error: { message: `resource doesn't exist` },
        });
      }
      res.resources = resources;
      next();
    })
    .catch(next);
});
resourcesRouter
  .route("/s/:site_id")
  .all((req, res, next) => {
    ResourcesService.getSiteResourcesIdArr(
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
// Add a existing resource to a site.
resourcesRouter.route("/s/").post(requireAuth, (req, res, next) => {
  if (!req.body.link) {
    res.status(400).json({ error: "Link is required" });
  }
  const { site_id, resource_id } = req.body;
  console.log(site_id);

  ResourcesService.insertResourceToSite(
    req.app.get("db"),
    parseInt(resource_id),
    parseInt(site_id)
  )
    .then((resource) => {
      console.log(resource);
      res.status(201).json(resource);
    })
    .catch(next);
});

module.exports = resourcesRouter;
