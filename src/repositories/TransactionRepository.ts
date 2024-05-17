import { transaction } from "../db/schema/transaction";
import { db } from "../db/client";

class TransactionRepository {
  async findAll() {
    const transactions = await db.select().from(transaction);
    return transactions;
  }
}

export default TransactionRepository;
