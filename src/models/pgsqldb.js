import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

export const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
await client.connect();

// await client.end();
