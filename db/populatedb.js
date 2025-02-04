#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  last_used DATE DEFAULT CURRENT_DATE,
  time_added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO items (name, category)
VALUES
  ('Shirt', 'Clothing')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.LOCAL_DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false, // Accepts self-signed certificates. Use cautiously!
    // },
  });
  await client.connect();
  console.log("connected...");
  await client.query(SQL);
  console.log("finished query...");
  await client.end();
  console.log("done");
}

main();
