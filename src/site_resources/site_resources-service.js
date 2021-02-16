const SiteResourceService = {
  async getAllResources(db, site_id) {
    let resources = await db
      .select("id")
      .from("resources")
      .where({ site_id })
      .distinct()
      .then((resources) => {
        return db
          .select("*")
          .from("resources")
          .whereIn(
            "resource_id",
            resources.map((r) => r.id)
          );
      });
  },
  getById(db, id, user_id) {
    return db.select("*").from("resources").where({ id: id, user_id }).first();
  },
};

module.exports = SiteResourceService;
