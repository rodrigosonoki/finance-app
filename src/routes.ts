import { Router, Request, Response } from "express";
import TransactionController from "./controller/TransactionController";
import TransactionRepository from "./repositories/TransactionRepository";
import TransactionService from "./services/TransactionService";

// Create a new Express router
const routes = Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

routes.get("/", async (req: Request, res: Response) => {
  await transactionController.getAllTransactions(req, res);
});

routes.get("/balance", async (req: Request, res: Response) => {
  await transactionController.getCurrentBalance(req, res);
});

routes.post("/transaction", async (req: Request, res: Response) => {
  await transactionController.createTransaction(req, res);
});

export default routes;
