const ResourcesService = {
  async getAllResources(db, user_id) {
    let sites = await db
      .select("id")
      .from("sites")
      .where({ user_id })
      .distinct()
      .then((sites) => {
        return sites;
        // return db.select("*").from("resources").whereIn("site_id", sites.map(s=>s.id));
      });
    let siteids = sites.map((site) => site.id);
    return db.select("*").from("resources").whereIn("site_id", siteids);
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
  getById(db, id) {
    return db.select("*").from("resources").where({ id }).first();
  },
  deleteResource(db, id) {
    return db.from("resources").where({ id }).delete();
  },
  updateResource(db, id, updateResource) {
    return db.from("resources").where({ id }).update(updateResource);
  },
};

module.exports = ResourcesService;
