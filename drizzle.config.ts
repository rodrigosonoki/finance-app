import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  throw new Error("Env variables not found!");
}

export default defineConfig({
  schema: "./src/db/schema/transaction.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
