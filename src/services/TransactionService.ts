import TransactionRepository from "../repositories/TransactionRepository";
import { Transaction, NewTransaction } from "../db/schema/transaction";
import { centsToReal } from "../utils/converts";

class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  async createTransaction(transaction: NewTransaction): Promise<void> {
    return this.transactionRepository.create(transaction);
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
