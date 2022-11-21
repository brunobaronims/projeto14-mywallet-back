import { sessionCollection, userCollection } from "../db/mongo.js";

export async function authValidation(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.replace('Bearer ', '');

  if (!token)
    return res.status(401).send('Falha de autenticação');

  try {
    const session = await sessionCollection.findOne({ token });

    if (!session)
      return res.status(401).send('Sessão não encontrada');

    const user = await userCollection.findOne({ _id: session.userId });

    if (!user)
      return res.status(401).send('Usuário não encontrado');

    req.currentUser = user;
  } catch (e) {
    return res.sendStatus(500);
  }

  next();
}