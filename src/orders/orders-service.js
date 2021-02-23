const OrdersService = {
  getSiteOrders(db, site_id) {
    // the customers table have the site_id and the orders table have the customer_id as foreing key.
    // I need to fiend the orders from the orders table where the customers.customer.id = customers.site_id.
    return db
      .raw(
        `
   SELECT DISTINCT ON (sites.id) *
   FROM sites
   INNER JOIN
   customers
   ON
   customers.site_id = sites.id
   AND sites.id = ${site_id}`
      )
      .then((res) => {
        return db.raw(`
     SELECT *
     FROM orders
     INNER JOIN 
     customers
     ON
     customers.id = customer_id IN
      (${res.rows[0].orders})
     `);
      });
  },
  insertOrder(db, newOrder) {
    return db
      .insert(newOrder)
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
