import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";

class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    const transactions = await this.transactionService.getAllTransactions();
    if (transactions) {
      res.status(200).json(transactions);
    } else {
      res.status(404).json({ message: "No transactions found :(" });
    }
  }

  async getCurrentBalance(req: Request, res: Response): Promise<void> {
    const currentBalance = await this.transactionService.getCurrentBalance();
    res.status(200).json(currentBalance);
  }
}

export default TransactionController;
