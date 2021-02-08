const app = require("./app");
const { PORT, DB_URL } = require("./config");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: DB_URL,
});

app.set("db", db);
app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Express server is listening at http://localhost:${PORT}`);
});
