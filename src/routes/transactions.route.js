import { Router } from "express";
import { newTransaction, getTransactions } from "../controllers/transactions.controller.js";
import { transactionValidation } from '../middleware/transactionValidation.js';
import { authValidation } from '../middleware/authValidation.js';

const router = Router();

router.use(authValidation);

router.post('/transactions/:type', transactionValidation, newTransaction);
router.get('/transactions', getTransactions);

export default router;