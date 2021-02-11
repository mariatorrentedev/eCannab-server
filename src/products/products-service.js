const ProductsService = {
  async getAllProducts(db, user_id) {
    let rows = await db
      .select("id")
      .from("sites")
      .where({ user_id })
      .distinct()
      .then((rows) => {
        return rows;
      });
    let siteids = rows.map((row) => {
      return row.id;
    });
    return db
      .select("*")
      .from("products")
      .join("sites", "sites.id", "=", "products.site_id")
      .whereIn("site_id", siteids);
  },
  insertProduct(db, newProduct) {
    return db
      .insert(newProduct)
      .into("products")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id, site_id) {
    return db.select("*").from("products").where({ id: id, site_id }).first();
  },
  deleteProduct(db, id, site_id) {
    return db.from("products").where({ id, site_id }).delete();
  },
  updateProduct(db, id, updateProduct, site_id) {
    return db.from("products").where({ id, site_id }).update(updateProduct);
  },
};

module.exports = ProductsService;
