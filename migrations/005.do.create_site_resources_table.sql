CREATE TABLE site_resources (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
   "resources_id" INTEGER REFERENCES "resources"(id)
   ON DELETE CASCADE NOT NULL,
   "sites_id" INTEGER REFERENCES "sites"(id)
    ON DELETE CASCADE NOT NULL,
)