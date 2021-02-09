module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DB_URL || "postgresql://carito@localhost/ecannab",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000/api",
  JWT_SECRET: process.env.JWT_SECRET,
};
