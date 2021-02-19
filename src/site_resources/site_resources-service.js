const SiteResourceService = {
  getSiteResources(db, site_id) {
    return db
      .raw(
        `
   SELECT DISTINCT ON (sites.id) *
   FROM sites
   INNER JOIN
   site_resources
   ON
   site_resources.site_id = sites.id
   AND sites.id = ${site_id}`
      )
      .then((res) => {
        return db.raw(`
     SELECT *
     FROM resources
     WHERE resources.id IN (${res.rows[0].resources.join(", ")})
     `);
      });
  },
  insertResourcesIntoSite(db, newResource) {
    return db
      .insert(newResource)
      .into("sites")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  //Uniendo 1 site con muchos resources 1 TO MANY relationship.
};

module.exports = SiteResourceService;
