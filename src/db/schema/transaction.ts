import { pgTable, text, numeric, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Transaction model representing a table in the database.
 */
export const typeEnum = pgEnum("type", ["income", "outcome"]);

export const transactionTable = pgTable("Transaction", {
  // ID column using a UUID data type for uniqueness
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4())
    .unique(),

  // Type of transaction
  type: typeEnum("type").notNull(),

  // Amount of the transaction
  amount: numeric("amount").notNull(),

  // Optional label for the transaction
  label: text("label"),

  // Timestamp of transaction creation
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),

  // Timestamp of transaction last update
  updatedAt: timestamp("updated_at"),
});

export const insertTransactionSchema = createInsertSchema(transactionTable);
export const selectTransactionSchema = createSelectSchema(transactionTable);
export type Transaction = z.infer<typeof selectTransactionSchema>;
export type NewTransaction = z.infer<typeof insertTransactionSchema>;
