const express = require("express");
const ResourcesService = require("./resources-service");
const { requireAuth } = require("../middleware/jwt-auth");

const resourcesRouter = express.Router();
const bodyParser = express.json();

resourcesRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    ResourcesService.getAllResources(req.app.get("db"), req.user.id)
      .then((resources) => res.json(resources))
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({ error: "Name is required" });
    }
    const newresource = req.body;

    ResourcesService.insertResource(req.app.get("db"), newresource)
      .then((resource) => {
        res.status(201).location(`/resources/${resource.id}`).json(resource);
      })
      .catch(next);
  });

resourcesRouter
  .route("/:id")
  .all(requireAuth, (req, res, next) => {
    cid = parseInt(req.params.id);
    ResourcesService.getById(req.app.get("db"), cid)
      .then((resources) => {
        if (!resources) {
          return res.status(404).json({
            error: { message: `Resource doesn't exist` },
          });
        }
        req.resource = resources[0];
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(req.resource);
  })
  .delete((req, res, next) => {
    ResourcesService.deleteResource(req.app.get("db"), cid)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(bodyParser, (req, res, next) => {
    const updateResource = req.body;
    ResourcesService.updateResource(req.app.get("db"), cid, updateResource)
      .then(() => {
        res.status(200).json((res.updateResource = updateResource));
      })
      .catch(next);
  });

module.exports = resourcesRouter;
