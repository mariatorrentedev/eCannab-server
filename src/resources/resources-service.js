const ResourcesService = {
  getAllResources(db) {
    return db.select("*").from("resources");
  },
  insertResource(db, newResource) {
    return db
      .insert(newResource)
      .into("resources")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id, user_id) {
    return db.select("*").from("resources").where({ id: id, user_id }).first();
  },
  getSiteResourcesIdArr(db, site_id) {
    return db
      .raw(
        `
   SELECT resources
   FROM sites
   WHERE sites.id = ${site_id}`
      )
      .then((res) => {
        return db.raw(`
     SELECT *
     FROM resources
     WHERE resources.id IN (${res.rows[0].resources.join(", ")})
     `);
      });
  },
  insertResourceToSite(db, resource_id, site_id) {
    return db
      .insert("resources", resource_id)
      .into("sites", "resources")
      .whereIn("sites.id", site_id)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = ResourcesService;
