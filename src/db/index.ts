import {Pool} from "pg"
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Pool({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "rahul@123",
    database: "postgres",
  });

client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  });



export const db = drizzle(client);