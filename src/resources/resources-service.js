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
};

module.exports = ResourcesService;
