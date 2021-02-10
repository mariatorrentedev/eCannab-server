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

module.exports = resourcesRouter;
