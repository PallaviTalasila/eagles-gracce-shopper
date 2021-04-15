// Connect to DB
// Connect to DB
const { Client } = require("pg");
const DB_NAME = "grace-shopper";
//const DB_URL =   process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
//for heroku1
const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});


// database methods

// export
module.exports = {
  client,
  // db methods
}