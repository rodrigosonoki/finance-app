import { pgTable, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Transaction model representing a table in the database.
 */
export const transaction = pgTable("Transaction", {
  // ID column using a UUID data type for uniqueness
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4())
    .unique(),

  // Type of transaction
  type: text("type").notNull(),

  // Amount of the transaction
  amount: numeric("amount").notNull(),

  // Optional label for the transaction
  label: text("label"),

  // Timestamp of transaction creation
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Timestamp of transaction last update
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTransactionSchema = createInsertSchema(transaction);
export const selectTransactionSchema = createSelectSchema(transaction);

export type Transaction = z.infer<typeof selectTransactionSchema>;
