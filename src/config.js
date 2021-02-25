module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://carito@localhost/ecannab",
  TEST_DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://carito@localhost/ecannab-test",
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000/api",
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ORIGIN:
    process.env.CLIENT_ORIGIN || "https://ecannab-client.vercel.app",
};
