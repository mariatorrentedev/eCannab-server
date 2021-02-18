const SiteResourceService = {
  getSiteResources(db, site_id) {
    console.log(site_id);
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
  //Uniendo 1 site con muchos resources 1 TO MANY relationship.
  //selecciono TODOS de sites table donde el SITE_ID es igual al site_id, luego
};

module.exports = SiteResourceService;
