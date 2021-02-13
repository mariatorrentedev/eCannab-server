const ProductsService = {
  async getAllProducts(db, user_id) {
    let sites = await db
      .select("id")
      .from("sites")
      .where({ user_id })
      .distinct()
      .then((sites) => {
        return sites;
        // return db.select("*").from("products").whereIn("site_id", sites.map(s=>s.id));
      });
    let siteids = sites.map((site) => site.id);
    return db.select("*").from("products").whereIn("site_id", siteids);
  },

  async insertProduct(db, newProduct) {
    return await db
      .insert(newProduct)
      .into("products")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db.select("*").from("products").where({ id }).first();
  },
  deleteProduct(db, id) {
    return db.from("products").where({ id }).delete();
  },
  updateProduct(db, id, updateProduct) {
    return db.from("products").where({ id }).update(updateProduct);
  },
};

module.exports = ProductsService;
