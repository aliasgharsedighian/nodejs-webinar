import pg from "pg";
const { Client } = pg;
export const client = new Client({
  PGUSER: "postgres",
  PGHOST: "localhost",
  PGPASSWORD: "9437615820",
  port: "5432",
  database: "shop_webinar_node",
});
await client.connect();

// await client.end();
