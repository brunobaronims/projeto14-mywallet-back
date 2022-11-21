import { userSchema } from "../schema/user.schema.js";
import { userCollection } from "../db/mongo.js";

export async function signUpValidation(req, res, next) {
  const data = req.body;
  const nameIsRegistered = await userCollection.findOne({ name: data.name });

  if (nameIsRegistered) 
    return res.status(409).send('Nome de usuário já cadastrado');

  try {
    await userSchema.validateAsync(data);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
}