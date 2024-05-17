import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";

class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      // Return an empty array when no transactions are found
      if (!transactions || transactions.length === 0) {
        res.status(200).json([]);
      } else {
        res.status(200).json(transactions);
      }
    } catch (error) {
      console.error("Failed to retrieve transactions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCurrentBalance(req: Request, res: Response): Promise<void> {
    try {
      const currentBalance = await this.transactionService.getCurrentBalance();
      if (currentBalance !== undefined) {
        // Assuming balance could be zero, which is valid
        res.status(200).json({ balance: currentBalance });
      } else {
        res.status(404).json({ message: "Current balance not available." });
      }
    } catch (error) {
      console.error("Failed to retrieve current balance:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    const { amount, type } = req.body;

    if (!amount || !type) {
      const missing = [];
      if (!amount) missing.push("amount");
      if (!type) missing.push("type");
      res
        .status(400)
        .json({ message: `Missing values: ${missing.join(", ")}.` });
      return;
    }

    try {
      await this.transactionService.createTransaction({ amount, type });
      res.status(201).send();
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default TransactionController;
