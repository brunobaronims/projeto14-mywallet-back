import { userSchema } from "../schema/user.schema.js";
import { userCollection } from "../db/mongo.js";
import { stripHtml } from "string-strip-html";

export async function signUpValidation(req, res, next) {
  const data = req.body;
  const name = stripHtml(data.name).result;
  const nameIsRegistered = await userCollection.findOne({ name: name });

  if (nameIsRegistered) 
    return res.status(409).send('Nome de usuário já cadastrado');

  try {
    await userSchema.validateAsync(data);
  } catch (e) {
    return res.status(422).send(e.message);
  }

  next();
}