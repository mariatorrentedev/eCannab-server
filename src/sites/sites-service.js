/*const TastingsService = {
  // All tastings CRUD are going to depend on the userId(as foreign key of tastings table)
  getAllTastings(db, userid) {
    return db.select("*").from("tastings").where({ userid });
  },
  insertTasting(db, newTasting) {
    return db
      .insert(newTasting)
      .into("tastings")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id, userid) {
    return db.select("*").from("tastings").where({ id: id, userid }).first();
  },
  deleteTasting(db, id, userid) {
    return db.from("tastings").where({ id, userid }).delete();
  },
  updateTasting(db, id, updateTasting, userid) {
    return db.from("tastings").where({ id, userid }).update(updateTasting);
  },
};

module.exports = TastingsService; */
