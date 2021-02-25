require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  const pg = require("pg");
  pg.defaults.ssl = { rejectUnauthorized: false };
}
module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
};
