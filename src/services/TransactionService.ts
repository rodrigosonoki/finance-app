import TransactionRepository from "../repositories/TransactionRepository";
import { Transaction } from "../db/schema/transaction";
import { centsToReal } from "../utils/converts";

class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    // Implement business logic to get all users
    return this.transactionRepository.findAll();
  }

  async getCurrentBalance(): Promise<string> {
    const transactions = await this.transactionRepository.findAll();
    let currentBalance = 0;

    transactions.forEach((transaction) => {
      const { amount, type } = transaction;
      switch (type) {
        case "outcome":
          currentBalance -= Number(amount);
          break;
        case "income":
          currentBalance += Number(amount);
          break;
      }
    });

    return centsToReal(currentBalance);
  }
}

export default TransactionService;
