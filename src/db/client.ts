import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.PG_URL) {
  throw new Error("PG URL NOT FOUND!");
}

export const pg = postgres(process.env.PG_URL);
export const db = drizzle(pg);
