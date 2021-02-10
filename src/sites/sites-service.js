const SitesService = {
  getAllSites(db, user_id) {
    return db.select("*").from("tastings").where({ user_id });
  },
  insertSite(db, newSite) {
    return db
      .insert(newSite)
      .into("sites")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id, user_id) {
    return db.select("*").from("sites").where({ id: id, user_id }).first();
  },
  deleteSite(db, id, user_id) {
    return db.from("sites").where({ id, user_id }).delete();
  },
  updateSite(db, id, updateSite, user_id) {
    return db.from("sites").where({ id, user_id }).update(updateSite);
  },
};

module.exports = SitesService;
