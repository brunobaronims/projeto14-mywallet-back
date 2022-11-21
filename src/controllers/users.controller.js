import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';
import { v4 as uuid } from 'uuid';
import { userCollection, sessionCollection } from '../db/mongo.js';

export async function signUp(req, res) {
  const data = await req.body;
  const name = stripHtml(data.name).result;
  const saltRounds = 10;

  try {
    await bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      await userCollection.insertOne({
        email: data.email,
        password: hash,
        name: name
      });
      return res.sendStatus(201);
    });
  } catch (e) {
    return res.sendStatus(500);
  }
};

export async function signIn(req, res) {
  const token = uuid();

  try {
    const user = req.currentUser;
    await sessionCollection.insertOne({
      token,
      userId: user._id
    })

    res.send({ token });
  } catch (e) {
    res.sendStatus(500);
  }
};