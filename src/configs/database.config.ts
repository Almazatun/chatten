export default () => ({
  dbPg: process.env.DB_PG || "pg",
  dbName: process.env.DB_DATABASE || "dbName",
  dbUser: process.env.DB_USER || "user",
  dbPassword: process.env.DB_PASSWORD || "password",
  dbHost: process.env.DB_HOST || "host",
  dbPort: process.env.DB_PORT || "port",
});
