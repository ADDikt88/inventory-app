const { Pool } = require("pg");

const env = process.argv[2]; // 'local' or 'production'
const connectionString =
  env === "prod"
    ? process.env.PROD_DATABASE_URL
    : process.env.LOCAL_DATABASE_URL;

if (!connectionString) {
  console.error(`Error: No connection string found for environment: ${env}`);
  process.exit(1);
}

if (!process.env.LOCAL_DATABASE_URL) {
  console.error(
    "Error: DATABASE_URL is not defined. Please create a .env file."
  );
  process.exit(1);
}

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  connectionString,
  // ssl: {
  //   rejectUnauthorized: false, // Accepts self-signed certificates. Use cautiously!
  // },
});
