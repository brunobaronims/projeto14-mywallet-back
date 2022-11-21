import { userCollection } from "../db/mongo.js";
import bcrypt from 'bcrypt';

export async function signInValidation(req, res, next) {
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatches)
    return res.sendStatus(401);

  req.currentUser = user;

  next();
}