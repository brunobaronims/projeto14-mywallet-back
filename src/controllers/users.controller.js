import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { usersCollection } from '../db/mongo.js';

export async function signUp(req, res) {
  const data = await req.body;
  const saltRounds = 10;

  try {
    await bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      await usersCollection.insertOne({ ...data, password: hash });
      return res.sendStatus(201);
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

export async function signIn(req, res) {
  return null;
};