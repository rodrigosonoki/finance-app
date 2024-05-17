import { transactionTable, NewTransaction } from "../db/schema/transaction";
import { db } from "../db/client";

class TransactionRepository {
  async findAll() {
    const transactions = await db
      .select()
      .from(transactionTable)
      .orderBy(transactionTable.createdAt);
    return transactions;
  }

  async create(transaction: NewTransaction) {
    try {
      await db.insert(transactionTable).values(transaction);
    } catch (err) {
      throw new Error("Unable to create transaction :(");
    }
  }
}

export default TransactionRepository;
