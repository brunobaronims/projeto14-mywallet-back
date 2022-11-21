import { transactionSchema } from "../schema/transaction.schema.js";

export async function transactionValidation(req, res, next) {
  const data = req.body;

  try {
    await transactionSchema.validateAsync(data);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
}
