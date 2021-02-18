const OrdersService = {
  getAllOrders(db, customer_id) {
    return db.select("*").from("orders").where({ customer_id });
  },
  insertOrder(db, newSite) {
    return db
      .insert(newSite)
      .into("orders")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getById(db, id, customer_id) {
    return db.select("*").from("orders").where({ id: id, customer_id }).first();
  },
  deleteOrder(db, id, customer_id) {
    return db.from("orders").where({ id, customer_id }).delete();
  },
  updateOrder(db, id, updateOrder, customer_id) {
    return db.from("orders").where({ id, customer_id }).update(updateOrder);
  },
};

module.exports = OrdersService;
